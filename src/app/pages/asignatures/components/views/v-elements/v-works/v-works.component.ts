import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { GeneralService } from '../../../../../../providers';
import { END_POINTS } from '../../../../../../providers/utils';
import { EmitEventsService } from '../../../../../../shared/services/emit-events.service';

@Component({
  selector: 'app-v-works',
  templateUrl: './v-works.component.html',
  styleUrls: ['./v-works.component.scss']
})
export class VWorksComponent implements OnInit {
  elementId: any = this.activatedRoute.snapshot.paramMap.get('id');
  idCargaCursoDocente: any = this.activatedRoute.snapshot.paramMap.get('id_carga_curso_docente');
  element: any = [];
  selectedItem = '3';

  loading: boolean = false;

  constructor(
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private generalService: GeneralService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.getElement();
  }

  getElement() {
    const serviceName = END_POINTS.base_back.elements;
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

  updateBreadcrumb(): void {
    const CE = this.element;
    const unidad = CE && CE.unit && CE.unit.orden_unidad || 'No existe la unidad';
    const sesion = CE && CE.topic && CE.topic.orden_tema || 'No existe la sesion'
    const elemento = CE && CE.type_element && CE.type_element.nombre || 'No existe tipo elemento';
    const elementoTitulo = CE && CE.titulo || 'No existe titulo';

    const breadcrumbs = [
      {
        label: 'Asignaturas',
        url: '/pages/asignaturas'
      },
      {
        label: CE && CE.curso && CE.curso.nombre || 'No se encontró el curso',
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
