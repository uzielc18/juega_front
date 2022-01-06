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
import { PrepareFileProModule } from 'src/app/shared/components/prepare-file-pro/prepare-file-pro.module';
import { WorksComponent } from './components/forms/works/works.component';
import { ControlMessagesModule } from 'src/app/shared/components/control-messages/control-messages.module';
import { MoreOptionsModule } from 'src/app/shared/components/more-options/more-options.module';
import { GeneralService } from 'src/app/providers';
import { ForusComponent } from './components/forms/forus/forus.component';
import { EnlaceExternalComponent } from './components/forms/enlace-external/enlace-external.component';
import { VidioConferenceComponent } from './components/forms/vidio-conference/vidio-conference.component';
import { EvaluationsComponent } from './components/forms/evaluations/evaluations.component';
import { DocumentsComponent } from './components/forms/documents/documents.component';
import { VidioComponent } from './components/forms/vidio/vidio.component';

const COMPONENTS: any[] = [
  WorksComponent,
  ForusComponent,
  EnlaceExternalComponent,
  VidioConferenceComponent,
  EvaluationsComponent,
  DocumentsComponent,
  VidioComponent,
];
const CONTROL_MESSAGGE: any = [
  ControlMessagesModule,
];
const SERVICES: any = [
  GeneralService,
]
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
    AdjuntarDocsComponent,
    ...COMPONENTS,
  ],
  exports: [CursosComponent],
  imports: [
    CommonModule,
    CursosRoutingModule,
    NebularModule,
    NgDynamicBreadcrumbModule,
    PrepareFileProModule,
    MoreOptionsModule,
    ...CONTROL_MESSAGGE
  ],
  providers: [...SERVICES]
})
export class CursosModule {}
