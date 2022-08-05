import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { EmitEventsService } from 'src/app/shared/services/emit-events.service';
import {Subscription} from "rxjs";
import Swal from "sweetalert2";

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
  imageFront: any;
  loading:boolean = false;
  zoom: any = [];
  datoSubscription: any = Subscription;
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
    this.datoSubscription = this.emitEventsService.returnsCurso().subscribe(value => { // para emitir evento desde la cabecera
      console.log(value)
      if(value){
        this.idCargaCursoDocente = value;
        this.getUnidades();
      }
    });
  }
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return '';
    }
  }
  ngOnDestroy(): void {
    this.emitEventsService.blockEnviar({from: 'Asignaturas', status: false});
    this.datoSubscription.unsubscribe();
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
        this.zoom = data.data;
        data.data.resumen.avance = Number(data.data.resumen.avance).toFixed(2);
        this.curso.resumen = data.data.resumen;
        this.curso.matriculados = data.data.matriculados;
        // console.log(this.curso);

        // lo
        if(this.zoom.portada === null){
          this.imageFront = 'assets/books.jpg'
        }
        if(this.zoom.cod_category !== null && this.zoom.portada === null){
          this.imageFront = `assets/${this.zoom.cod_category}.png`
        }
        if(this.zoom.cod_category === null && this.zoom.portada !== null){
          this.imageFront = this.zoom.portada
        }
        if(this.zoom.cod_category !== null && this.zoom.portada !== null){
          this.imageFront = this.zoom.portada
        }


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
  syncSessionesLamb() {
    const serviceName = END_POINTS.base_back.config + '/silabus';
    const params = {
      semestre: this.rolSemestre.semestre.codigo || '',
      idCargCurDoc: this.curso.id_carga_curso_docente || '',
      id_1: '0',
    }
    if(params && params.semestre && params.idCargCurDoc) {
      Swal.fire({
        title: 'Sincronizar',
        text: '¿ Desea sincronizar sesiones lamb ? ',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#00244E',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        // timer: 2000,
      }).then((result:any) => {
        if (result.isConfirmed) {
          this.generalService.nameIdAndIdAndId$(serviceName, params.semestre, params.idCargCurDoc, params.id_1).subscribe((res:any) => {
            if (res.success) {
              this.getUnidades();
            }
          });
        }
      });
    }
  }
}

