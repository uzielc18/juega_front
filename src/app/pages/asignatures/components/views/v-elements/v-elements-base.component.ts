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
  styleUrls: ['./v-elements-base.component.scss']
})
export class VElementsBaseComponent implements OnInit, OnDestroy {
  elementId: any = this.activatedRoute.snapshot.paramMap.get('id');
  idCargaCursoDocente: any = this.activatedRoute.snapshot.paramMap.get('id_carga_curso_docente');
  userInfo: any;
  element: any;
  loading: boolean = false;
  pending:any;
  nombreSubscription: any = Subscription;
  valida: boolean = false;
  theRolSemestre:any;
  constructor(
    private userService: AppService,
    private generalService: GeneralService,
    private activatedRoute: ActivatedRoute,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private router: Router,
    private emitEventsService: EmitEventsService,
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getElement();
    this.nombreSubscription = this.emitEventsService.returns().subscribe(value => { // para emitir evento desde la cabecera
      if (value && value.rol && value.semestre) {
        this.theRolSemestre =  value;
        this.valida = true;
        if (value.rol.name === 'Estudiante') {
          setTimeout(() => {
            this.getPendings();
          }, 1000);
        } else {
          this.pending = '';
        }
      } else {
        this.valida = false;
      }
      });
      this.recoveryValues();
      /// Para bloquear el rol de la cabecera
      this.emitEventsService.blockEnviar(true);
  }
  ngOnDestroy(): void {
    this.nombreSubscription.unsubscribe();
      /// Para bloquear el rol de la cabecera
    this.emitEventsService.blockEnviar(false);
  }
  recoveryValues() {
    this.emitEventsService.castRolSemester.subscribe(value => {
      if (value && value.rol && value.semestre && !this.valida) {
        this.theRolSemestre =  value;
        if (value.rol.name === 'Estudiante') {
          setTimeout(() => {
            this.getPendings();
          }, 1000);
        } else {
          this.pending = '';
        }
      }
    });
  }

  getUserInfo() {
    this.userInfo = this.userService.user;
  }

  getElement() {
    const serviceName = END_POINTS.base_back.resourse + '/info-element';
    if (this.elementId) {
      this.loading = true;
      this.generalService.nameId$(serviceName, this.elementId).subscribe((data: any) => {
        this.element = data.data;
        if (this.element) {
          this.updateBreadcrumb();
        }
      }, () => { this.loading = false; }, () => { this.loading = false; });
    }
  }
  getPendings() {
    const serviceName = END_POINTS.base_back.resourse + '/get-pending-student';
    // this.userInfo.id
    this.generalService.nameIdAndId$(serviceName, this.elementId, this.userInfo.id).subscribe((res:any) => {
      this.pending = res.data || '';
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
    const curso = CE && CE.course && CE.course.nombre || 'No existe el curso';
    const unidad = CE && CE.topic && CE.topic.unit.orden_unidad || 'No existe la unidad';
    const sesion = CE && CE.topic && CE.topic.orden_tema || 'No existe la sesion'
    const elemento = CE && CE.type_element && this.titleCase(CE.type_element.nombre) || 'No existe tipo elemento';
    const elementoTitulo = CE && CE.titulo || 'No existe titulo';

    const breadcrumbs = [
      {
        label: 'Asignaturas',
        url: '/pages/asignaturas'
      },
      {
        label: `${curso}` || 'No se encontró el curso',
        url: '/pages/asignaturas/course/' + this.idCargaCursoDocente,
      },
      {
        label: `Unidad: ${unidad} \u2013 Sesion: ${sesion} \u2013 ${elemento}: ${elementoTitulo}` || 'No se encontró el elemento',
        url: ''
      }

    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }
  elementSelected($event: any) {
    this.elementId = $event.id;
    this.router.navigate([`../asignaturas/course/${this.idCargaCursoDocente}/element/${$event.id}`], { relativeTo: this.activatedRoute.parent });
    this.getElement();

    if (this.theRolSemestre.rol.name === 'Estudiante') {
      this.getPendings();
    }
  }
  refreshPending() {
    this.getPendings();
  }
}
