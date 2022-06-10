import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { TeacherHomeComponent } from './containers/teacher-home.component';
import { NebularModule } from '../../../shared/nebular.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ControlMessagesModule } from '../../../shared/components/control-messages/control-messages.module';
import { GeneralService } from '../../../providers';
import { EditUserModule } from '../../../shared/components/edit-user/edit-user.module';

const COMPONENTS: any[] = [
  TeacherComponent,
  TeacherHomeComponent
];
const NG_MODULES: any = [
  NebularModule,
  EditUserModule
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
    TeacherRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class TeacherModule { }
