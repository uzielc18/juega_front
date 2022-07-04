import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgDynamicBreadcrumbService} from "ng-dynamic-breadcrumb";

@Component({
  selector: 'app-v-notes',
  templateUrl: './v-notes.component.html',
  styleUrls: ['./v-notes.component.scss']
})
export class VNotesComponent implements OnInit {

  idCargaCursoDocente: any = this.activatedRoute.snapshot.paramMap.get('id_carga_curso_docente');

  constructor(private activatedRoute: ActivatedRoute,
              private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,) { }

  ngOnInit(): void {
    this.updateBreadcrumb();
  }
  updateBreadcrumb(): void {
    const breadcrumbs = [
      {
        label: 'Asignaturas',
        url: '/pages/asignatures',
      },
      {
        label: `Curso prueba` || 'No se encontró el curso',
        url: '/pages/asignatures/course/' + this.idCargaCursoDocente,
      },
      {
        label: 'Notas',
        url: '',
      },
    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }
}
