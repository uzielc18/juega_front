import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { AdminGroupsComponent } from '../../modals/admin-groups/admin-groups.component';
import { HomeworkFormComponent } from '../../modals/homework-form/homework-form.component';

@Component({
  selector: 'app-v-course',
  templateUrl: './v-course.component.html',
  styleUrls: ['./v-course.component.scss']
})
export class VCourseComponent implements OnInit {
  idCargaCursoDocente: any = this.activatedRoute.snapshot.paramMap.get('id_carga_curso_docente');
  path: number = 0;
  curso: any = [];
  loading:boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService,
    private dialogService: NbDialogService,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService
  ) {}

  ngOnInit(): void {
    this.getUnidades();
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
        // url: '/pages/asignaturas/course/' + this.curso.id_carga_curso_docente,
      },

    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }
}

