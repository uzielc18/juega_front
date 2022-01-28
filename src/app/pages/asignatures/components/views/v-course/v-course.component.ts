import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { EmitEventsService } from 'src/app/shared/services/emit-events.service';

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
    public emitEventsService: EmitEventsService
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
          this.updateBreadcrumb();
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
        url: '/pages/asignaturas'
      },
      {
        label: this.curso.nombre,
        url: '',
      },

    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }
}

