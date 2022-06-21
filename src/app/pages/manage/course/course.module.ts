import { NgModule } from '@angular/core';

import { CourseRoutingModule } from './course-routing.module';
import { NebularModule } from 'src/app/shared/nebular.module';
import { ControlMessagesModule } from 'src/app/shared/components/control-messages/control-messages.module';
import { GeneralService } from 'src/app/providers';
import { CourseComponent } from './course.component';
import { CourseHomeComponent } from './containers/course-home.component';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { MMatricularComponent } from './components/modals/m-matricular/m-matricular.component';
import { NbStepperModule, NbTagModule } from '@nebular/theme';
import { MCourseFreeComponent } from './components/modals/m-course-free/m-course-free.component';
import { PrepareFileProModule } from 'src/app/shared/components/prepare-file-pro/prepare-file-pro.module';
import { MPortadaMiniaturaComponent } from './components/modals/m-portada-miniatura/m-portada-miniatura.component';
import { ImageRecorteModule } from 'src/app/shared/components/recortes/image-recorte/image-recorte.module';
import { UnitsSessionsModule } from 'src/app/shared/components/units-sessions/units-sessions.module';
import { MViewFilesModule } from 'src/app/shared/components/view-files/m-view-files/m-view-files.module';

const COMPONENTS: any[] = [
  CourseComponent,
  CourseHomeComponent,
  MMatricularComponent,
  MCourseFreeComponent,
  MPortadaMiniaturaComponent
];
const NG_MODULES: any = [
  NebularModule,
  NbTagModule,
  NbStepperModule
];
const NGB_MODULES: any = [
  NgbPaginationModule,
  // NgbTypeaheadModule
];
const CONTROL_MESSAGGE: any = [
  ControlMessagesModule,
];
const SERIVCES: any = [
  GeneralService,
];
const MODALS: any = [
  MMatricularComponent,
  MCourseFreeComponent,
  MPortadaMiniaturaComponent
];
const NGX_MODULES: any = [
];
const MODULES: any = [
  PrepareFileProModule,
  ImageRecorteModule,
  MViewFilesModule
];

@NgModule({
  providers: [
    ...SERIVCES,
  ],
  imports: [
    CourseRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})

export class CourseModule { }
