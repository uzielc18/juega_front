import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { AppService } from '../../../../../../core';
import { GeneralService } from '../../../../../../providers';
import { END_POINTS } from '../../../../../../providers/utils';

@Component({
  selector: 'app-v-forum',
  templateUrl: './v-forum.component.html',
  styleUrls: ['./v-forum.component.scss']
})
export class VForumComponent implements OnInit {
  elementId: any = this.activatedRoute.snapshot.paramMap.get('id');
  idCargaCursoDocente: any = this.activatedRoute.snapshot.paramMap.get('id_carga_curso_docente');
  element: any = [];
  userInfo: any = [];

  loading: boolean = false;

  constructor(
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private generalService: GeneralService,
    private activatedRoute: ActivatedRoute,
    private userService: AppService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getElement();
  }

  getUserInfo() {
    this.userInfo = this.userService.user;
    console.log(this.userInfo);
  }

  getElement() {
    const serviceName = END_POINTS.base_back.resourse + '/info-element';
    if (this.elementId) {
      this.loading = true;
      this.generalService.nameId$(serviceName, this.elementId).subscribe((data) => {
        this.element = data.data;
        if (this.element) {
          this.updateBreadcrumb();
          console.log('element content', this.element)
        }
      }, () => { this.loading = false; }, () => { this.loading = false; });
    }
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
}
