import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NebularModule } from '../../shared/nebular.module';

import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';

import { CursosRoutingModule } from './cursos-routing.module';

import { MainComponent } from './contents/main/main.component';
import { ChildrenComponent } from './components/children/children.component';
import { InfoComponent } from './components/info/info.component';
import { CursoComponent } from './contents/curso/curso.component';
import { UnidadComponent } from './components/unidad/unidad.component';
import { SesionComponent } from './components/sesion/sesion.component';
import { CursosComponent } from './contents/cursos/cursos.component';
import { HomeworkFormComponent } from './components/homework-form/homework-form.component';
import { CursoCardComponent } from './components/curso-card/curso-card.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { TrabajoComponent } from './contents/trabajo/trabajo.component';
import { VideoConferenciaComponent } from './contents/video-conferencia/video-conferencia.component';
import { AdjuntarDocsComponent } from './components/adjuntar-docs/adjuntar-docs.component';
import { CursoListComponent } from './components/curso-list/curso-list.component';

@NgModule({
  declarations: [
    MainComponent,
    ChildrenComponent,
    InfoComponent,
    CursoComponent,
    UnidadComponent,
    SesionComponent,
    CursosComponent,
    HomeworkFormComponent,
    CursoCardComponent,
    CursoListComponent,
    BreadcrumbComponent,
    NavegacionComponent,
    TrabajoComponent,
    VideoConferenciaComponent,
    AdjuntarDocsComponent
  ],
  exports: [CursosComponent],
  imports: [
    CommonModule,
    CursosRoutingModule,
    NebularModule,
    NgDynamicBreadcrumbModule,
  ],
})
export class CursosModule {}
