import { NgModule } from '@angular/core';
import { TypeTeachersRoutingModule } from './type-teachers-routing.module';
import { TypeTeachersComponent } from './type-teachers.component';
import { TypeTeachersHomeComponent } from './containers/type-teachers-home/type-teachers-home.component';
import { MTypeTeachersComponent } from './components/modals/m-type-teachers/m-type-teachers.component';
import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";


const COMPONENTS: any[] = [
  TypeTeachersComponent,
  TypeTeachersHomeComponent,
  MTypeTeachersComponent
];
const NG_MODULES: any = [
  NebularModule,
];
const NGB_MODULES: any = [
];
const CONTROL_MESSAGGE: any = [
  ControlMessagesModule,
];
const SERIVCES: any = [
  GeneralService,
];
const MODALS: any = [
  MTypeTeachersComponent
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
    TypeTeachersRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class TypeTeachersModule { }
