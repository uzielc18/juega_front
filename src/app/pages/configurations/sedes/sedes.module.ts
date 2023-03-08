import { NgModule } from '@angular/core';
import { SedesComponent } from './sedes.component';
import { SedesHomeComponent} from './containers/sedes-home.component';
import { MSedesComponent } from './components/modals/m-sedes/m-sedes.component';
import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";
import {SedesRoutingModule} from "./sedes-routing.module";

const COMPONENTS: any[] = [
  SedesHomeComponent,
  SedesComponent,
  MSedesComponent
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
  //MSemestersComponent
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
    SedesRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class SedesModule { }
