import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { StudentHomeComponent } from './containers/student-home.component';
import { NebularModule } from '../../../shared/nebular.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ControlMessagesModule } from '../../../shared/components/control-messages/control-messages.module';
import { GeneralService } from '../../../providers';

const COMPONENTS: any[] = [
  StudentComponent,
  StudentHomeComponent
];
const NG_MODULES: any = [
  NebularModule,
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
    StudentRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class StudentModule { }
