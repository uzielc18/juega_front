import { NgModule } from '@angular/core';

import { CourseRoutingModule } from './course-routing.module';
import { NebularModule } from 'src/app/shared/nebular.module';
import { ControlMessagesModule } from 'src/app/shared/components/control-messages/control-messages.module';
import { GeneralService } from 'src/app/providers';
import { CourseComponent } from './course.component';
import { CourseHomeComponent } from './containers/course-home.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MMatricularComponent } from './components/modals/m-matricular/m-matricular.component';
import { NbStepperModule, NbTagModule } from '@nebular/theme';
import { MCourseFreeComponent } from './components/modals/m-course-free/m-course-free.component';

const COMPONENTS: any[] = [
  CourseComponent,
  CourseHomeComponent,
  MMatricularComponent,
  MCourseFreeComponent
];
const NG_MODULES: any = [
  NebularModule,
  NbTagModule,
  NbStepperModule
];
const NGB_MODULES: any = [
  NgbPaginationModule
];
const CONTROL_MESSAGGE: any = [
  ControlMessagesModule,
];
const SERIVCES: any = [
  GeneralService,
];
const MODALS: any = [
  MMatricularComponent,
  MCourseFreeComponent
];
const NGX_MODULES: any = [
];
const MODULES: any = [
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
