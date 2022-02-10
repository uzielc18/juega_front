import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
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
        url: '/pages/asignatures'
      },
      {
        label: this.curso.nombre,
        url: '',
      },

    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }
}

