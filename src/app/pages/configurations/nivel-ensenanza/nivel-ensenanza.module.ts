import { NgModule } from '@angular/core';
import { NivelEnsenanzaComponent } from './nivel-ensenanza.component';
import { NivelEnsenanzaHomeComponent } from './containers/nivel-ensenanza-home.component';
import { MNivelEnsenanzaComponent } from './components/modals/m-nivel-ensenanza/m-nivel-ensenanza.component';
import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";
import {NivelEnsenanzaRoutingModule} from "./nivel-ensenanza-routing.module";

const COMPONENTS: any[] = [
  NivelEnsenanzaHomeComponent,
  NivelEnsenanzaComponent,
  MNivelEnsenanzaComponent
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
    NivelEnsenanzaRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class NivelEnsenanzaModule { }
