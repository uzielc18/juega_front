import { NgModule } from '@angular/core';
import { TipoProgramasComponent } from './tipo-programas.component';
import { TipoProgramasHomeComponent } from './containers/tipo-programas-home.component';
import { MTipoProgramasComponent } from './components/modals/m-tipo-programas/m-tipo-programas.component';
import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";
import {TipoProgramasRoutingModule} from "./tipo-programas-routing.module";

const COMPONENTS: any[] = [
  TipoProgramasHomeComponent,
  TipoProgramasComponent,
  MTipoProgramasComponent
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
    TipoProgramasRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class TipoProgramasModule { }
