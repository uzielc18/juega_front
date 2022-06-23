import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { EmitEventsService } from 'src/app/shared/services/emit-events.service';
import { AppService } from '../../../../../core';

@Component({
  selector: 'app-v-elements-base',
  templateUrl: './v-elements-base.component.html',
  styleUrls: ['./v-elements-base.component.scss'],
})
export class VElementsBaseComponent implements OnInit, OnDestroy {
  elementId: any = this.activatedRoute.snapshot.paramMap.get('id');
  idCargaCursoDocente: any = this.activatedRoute.snapshot.paramMap.get('id_carga_curso_docente');
  userInfo: any;
  element: any;
  loading: boolean = false;
  has_rubric: boolean = false;
  rubrica: any;
  calification: any;
  listRubric: any[] = [];
  listRubricMod: any[] = [];
  colors: any[] = ['#57884e', '#8ba642', '#f9c851', '#f9a65a', '#f97a5a', '#f94a5a', '#f9065a'];
  bgColors: any[] = ['#57884e20', '#8ba64220', '#f9c85120', '#f9a65a20', '#f97a5a20', '#f94a5a20', '#f9065a20'];
  pending: any;
  listResponses: any = [];
  constructor(
    private userService: AppService,
    private generalService: GeneralService,
    private activatedRoute: ActivatedRoute,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private router: Router,
    private emitEventsService: EmitEventsService
  ) {}

  ngOnInit(): void {
    this.getElement();
    this.getUserInfo();
    this.emitEventsService.blockEnviar({ from: 'Asignaturas', status: true });
  }
  ngOnDestroy(): void {
    this.emitEventsService.blockEnviar({ from: 'Asignaturas', status: false });
  }

  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    const val = JSON.parse(sesion);
    if (val && val.rol) {
      return val;
    } else {
      return '';
    }
  }
  getUserInfo() {
    this.userInfo = this.userService.user;
  }

  getElement() {
    const serviceName = END_POINTS.base_back.resourse + '/info-element';
    if (this.elementId) {
      this.loading = true;
      this.generalService.nameId$(serviceName, this.elementId).subscribe(
        (data: any) => {
          this.element = data.data;
          this.has_rubric = this.element.rubricas_guia_id !== null ? true : false;
          // console.log(this.element, 'elemento');
          if (this.element) {
            if (this.rolSemestre?.rol?.name === 'Estudiante') {
              setTimeout(() => {
                this.getPendings();
              }, 1000);
            } else if (this.rolSemestre?.rol?.name === 'Docente' && this.element.tipo === 'FORO') {
              this.pending = '';
              setTimeout(() => {
                this.getResponsesDocen();
              }, 5000);
            } else {
              this.pending = '';
            }
            this.updateBreadcrumb();
          }
        },
        () => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }
  getPendings() {
    const serviceName = END_POINTS.base_back.resourse + '/get-pending-student';
    // this.userInfo.id
    this.loading = true;
    this.generalService.nameIdAndId$(serviceName, this.elementId, this.userInfo.id).subscribe(
      (res: any) => {
        this.pending = res.data || '';
        if (this.has_rubric) {
          this.getRubric();
        }
        // console.log(this.pending, 'pendiente');
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  getRubric() {
    if (this.has_rubric) {
      const serviceName = END_POINTS.base_back.rubrics + '/get-rubrica';
      this.loading = true;
      this.generalService.nameId$(serviceName, this.element.rubricas_guia_id).subscribe((res: any) => {
        if (res.success) {
          if (this.has_rubric) {
            this.rubrica = {};
            this.rubrica = res.data;
            this.checkAllNiveles();
            this.getRubricCalificacion();
          }
        }
      });
    }
  }

  getRubricCalificacion() {
    const serviceName = END_POINTS.base_back.rubrics + '/get-rubricas-calification';
    const params = {
      pending_id: this.pending.student_pending.id,
      persons_student_id: this.pending.student_pending.persons_student_id,
    };
    this.generalService.nameParams$(serviceName, params).subscribe(
      (res: any) => {
        if (res.success) {
          this.calification = res.data;
          // console.log(this.calification, 'calificacion');
        }
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  checkAllNiveles() {
    this.rubrica.criterios.map((criterio: any) => {
      criterio.niveles.map((item: any) => {
        item.checked = false;
      });
    });
  }

  titleCase(str: any) {
    return str
      .split(' ')
      .map((word: any) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  updateBreadcrumb(): void {
    const CE = this.element;
    const curso = (CE && CE.course && CE.course.nombre) || 'No existe el curso';
    const unidad = (CE && CE.topic && CE.topic.unit.orden_unidad) || 'No existe la unidad';
    const sesion = (CE && CE.topic && CE.topic.orden_tema) || 'No existe la sesion';
    const elemento = (CE && CE.type_element && this.titleCase(CE.type_element.nombre)) || 'No existe tipo elemento';
    const elementoTitulo = (CE && CE.titulo) || 'No existe titulo';

    const breadcrumbs = [
      {
        label: 'Asignaturas',
        url: '/pages/asignatures',
      },
      {
        label: `${curso}` || 'No se encontró el curso',
        url: '/pages/asignatures/course/' + this.idCargaCursoDocente,
      },
      {
        label:
          `Unidad: ${unidad} \u2013 Sesion: ${sesion} \u2013 ${elemento}: ${elementoTitulo}` ||
          'No se encontró el elemento',
        url: '',
      },
    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }
  elementSelected($event: any) {
    this.pending = '';
    this.elementId = $event.id;
    this.router.navigate([`../asignatures/course/${this.idCargaCursoDocente}/element/${$event.id}`], {
      relativeTo: this.activatedRoute.parent,
    });
    this.obtenerElementSelect();
  }
  obtenerElementSelect() {
    this.getElement();
    if (this.rolSemestre?.rol?.name === 'Estudiante') {
      this.getPendings();
    } else if (this.rolSemestre?.rol?.name === 'Docente' && this.element.tipo === 'FORO') {
      this.getResponsesDocen();
    }
  }
  getResponsesDocen() {
    const serviceName = END_POINTS.base_back.resourse + '/list_responses_forum';
    const params = {
      person_id: '',
    };
    this.loading = true;
    setTimeout(() => {
      if (this.element?.forums?.id) {
        this.generalService.nameIdParams$(serviceName, this.element?.forums?.id, params).subscribe(
          (res: any) => {
            this.listResponses = res.data || [];
            if (this.listResponses.length > 0) {
              this.listResponses.map((re: any) => {
                re.checked = false;
              });
            }
          },
          () => {
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        );
      }
    }, 1000);
  }
  refreshPending() {
    if (this.rolSemestre?.rol?.name === 'Estudiante') {
      this.getPendings();
    } else if (this.rolSemestre?.rol?.name === 'Docente' && this.element.tipo === 'FORO') {
      this.getResponsesDocen();
    }
  }
  changeLoading($event: any) {
    setTimeout(() => {
      this.loading = $event;
    }, 1000);
  }
  nextElemento(item:any) {
    if (item.next_page) {
      this.pending = '';
      this.elementId = item.next_page;
      this.router.navigate([`../asignatures/course/${this.idCargaCursoDocente}/element/${item.next_page}`], {
        relativeTo: this.activatedRoute.parent,
      });
      this.obtenerElementSelect();
    }
  }
  prevElemento(item:any) {
    if (item.prev_page) {
      this.pending = '';
      this.elementId = item.prev_page;
      this.router.navigate([`../asignatures/course/${this.idCargaCursoDocente}/element/${item.prev_page}`], {
        relativeTo: this.activatedRoute.parent,
      });
      this.obtenerElementSelect();
    }
  }
}
