import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsignaturesRoutingModule } from './asignatures-routing.module';
import { NebularModule } from 'src/app/shared/nebular.module';
import { ControlMessagesModule } from 'src/app/shared/components/control-messages/control-messages.module';
import { GeneralService } from 'src/app/providers';
import { AsignaturesComponent } from './asignatures.component';
import { AsignaturesHomeComponent } from './containers/asignatures-home.component';
import { VCourseComponent } from './components/views/v-course/v-course.component';
import { EmitEventsService } from 'src/app/shared/services/emit-events.service';
import { HomeworkFormComponent } from './components/modals/homework-form/homework-form.component';
import { AdminGroupsComponent } from './components/modals/admin-groups/admin-groups.component';
import { PrepareFileProModule } from 'src/app/shared/components/prepare-file-pro/prepare-file-pro.module';
import { MoreOptionsModule } from 'src/app/shared/components/more-options/more-options.module';
import { MenuElementsModule } from 'src/app/shared/components/menu-elements/menu-elements.module';
import { WorksComponent } from './components/forms/f-elements/works/works.component';
import { ForusComponent } from './components/forms/f-elements/forus/forus.component';
import { EnlaceExternalComponent } from './components/forms/f-elements/enlace-external/enlace-external.component';
import { VidioConferenceComponent } from './components/forms/f-elements/vidio-conference/vidio-conference.component';
import { EvaluationsComponent } from './components/forms/f-elements/evaluations/evaluations.component';
import { DocumentsComponent } from './components/forms/f-elements/documents/documents.component';
import { VidioComponent } from './components/forms/f-elements/vidio/vidio.component';
import { CarpetaComponent } from './components/forms/f-elements/carpeta/carpeta.component';
import { SesionComponent } from './components/c-free/sesion/sesion.component';
import { NavegacionComponent } from './components/c-free/navegacion/navegacion.component';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { VListCoursesComponent } from './components/views/v-list-courses/v-list-courses.component';
import { RubricasModule } from 'src/app/shared/components/rubricas/rubricas.module';
import { ListViewFilesModule } from 'src/app/shared/components/list-view-files/list-view-files.module';
import { MenuElementsChildModule } from 'src/app/shared/components/menu-elements-child/menu-elements-child.module';

const COMPONENTS: any[] = [
  AsignaturesComponent,
  AsignaturesHomeComponent,
  VCourseComponent,
  HomeworkFormComponent,
  AdminGroupsComponent,
  WorksComponent,
  ForusComponent,
  EnlaceExternalComponent,
  VidioConferenceComponent,
  EvaluationsComponent,
  DocumentsComponent,
  VidioComponent,
  CarpetaComponent,
  SesionComponent,
  NavegacionComponent,
  VListCoursesComponent
];
const NG_MODULES: any = [
  NebularModule,
  NgDynamicBreadcrumbModule,
];
const NGB_MODULES: any = [
  // NgbModule
];
const CONTROL_MESSAGGE: any = [
  ControlMessagesModule,
];
const SERIVCES: any = [
  GeneralService,
  EmitEventsService
];
const MODALS: any = [
  HomeworkFormComponent,
  AdminGroupsComponent
];
const NGX_MODULES: any = [

];
const MODULES: any = [
  PrepareFileProModule,
  MoreOptionsModule,
  MenuElementsModule,
  RubricasModule,
  ListViewFilesModule,
  MenuElementsChildModule
];

@NgModule({
  providers: [
    ...SERIVCES,
  ],
  imports: [
    AsignaturesRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],

})

export class AsignaturesModule { }
