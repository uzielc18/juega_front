import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { EmitEventsService } from 'src/app/shared/services/emit-events.service';

// IMPORTANTE
// -(rol (docente y admin)  && tiene_permiso = 1 hace todas las acciones del docente)
// -(rol estudiante && tiene_permiso = 1 hace todas las acciones como estudiante)
// -rol diferente de (admin, docente y estudiante) && tiene_permiso = 2 solo puede ver hasta elemento.
// -retornar a asignaturas si tiene_permiso = 0;
@Component({
  selector: 'app-v-course',
  templateUrl: './v-course.component.html',
  styleUrls: ['./v-course.component.scss']
})
export class VCourseComponent implements OnInit, OnDestroy {
  idCargaCursoDocente: any = this.activatedRoute.snapshot.paramMap.get('id_carga_curso_docente');
  path: number = 0;
  curso: any = [];
  loading:boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    public emitEventsService: EmitEventsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUnidades();
    this.emitEventsService.blockEnviar({from: 'Asignaturas', status: true});
  }
  ngOnDestroy(): void {
    this.emitEventsService.blockEnviar({from: 'Asignaturas', status: false});
  }
  getUnidades() {
    const serviceName = END_POINTS.base_back.resourse + '/elements-course';
    if (this.idCargaCursoDocente) {
      this.loading = true;
      this.generalService.nameId$(serviceName, this.idCargaCursoDocente).subscribe((data) => {
        this.curso = data.data;
        if (this.curso) {
          if (this.curso.tiene_permiso === 0) { // no tiene acceso al curso
            this.router.navigate([`/pages/asignatures`], {relativeTo: this.activatedRoute.parent});
          } else {
            this.getCursoShow(this.curso.id);
            this.updateBreadcrumb();

            if (this.curso?.units.length>0) {
              this.curso?.units.map((res:any) => {
                if(res.orden_unidad == 1){
                  res.checked = false
                }else{
                  res.checked = true;
                }
              });
            }
          }
        }
      }, () => { this.loading =false; }, () => { this.loading =false; });
    }
  }
  getCursoShow(couurse_id:any) {
    const serviceName = 'courses';
    if (this.idCargaCursoDocente) {
      this.loading = true;
      this.generalService.nameId$(serviceName, couurse_id).subscribe((data) => {
        // console.log(data.data);
        data.data.resumen.avance = Number(data.data.resumen.avance).toFixed(2);
        this.curso.resumen = data.data.resumen;
        this.curso.matriculados = data.data.matriculados;
        // console.log(this.curso);

        // lo
      }, () => { this.loading =false; }, () => { this.loading =false; });
    }
  }
  validaExist() {
    this.getUnidades();
  }
  updateBreadcrumb(): void {
    const breadcrumbs  =  [
      {
        label: 'Asignaturas',
        url: '/pages/asignatures'
      },
      {
        label: this.curso.nombre,
        url: '',
      },

    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }
  eventsChangesss($event:any) {
    if ($event === 'ok') {
      this.getUnidades();
    }
  }
  changeColapse($event:any) {
    this.curso?.units.map((res:any) => {
      res.checked = true;
    });
    $event.checked = false;
    // console.log($event);

  }
  status(value:any) {
    // console.log(value);

    if (value <= 33) {
      return 'danger';
    } else if (value <= 66) {
      return 'warning';
    } else {
      return 'success';
    }
  }
}

