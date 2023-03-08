import { NgModule } from '@angular/core';
import { TipoContratosComponent } from './tipo-contratos.component';
import { TipoContratosHomeComponent } from './containers/tipo-contratos-home.component';
import { MTipoContratosComponent } from './components/modals/m-tipo-contratos/m-tipo-contratos.component';
import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";
import {TipoContratosRoutingModule} from "./tipo-contratos-routing.module";

const COMPONENTS: any[] = [
  TipoContratosHomeComponent,
  TipoContratosComponent,
  MTipoContratosComponent
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
    TipoContratosRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class TipoContratosModule { }
