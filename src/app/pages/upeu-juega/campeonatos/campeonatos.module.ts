import { NgModule } from '@angular/core';
import { CampeonatosComponent } from './campeonatos.component';
import { CampeonatosHomeComponent} from './containers/campeonatos-home.component';
import { MCampeonatosComponent } from './components/modals/m-campeonatos/m-campeonatos.component';
import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";
import {CampeonatosRoutingModule} from "./campeonatos-routing.module";

const COMPONENTS: any[] = [
  CampeonatosHomeComponent,
  CampeonatosComponent,
  MCampeonatosComponent
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
    CampeonatosRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class CampeonatosModule { }
