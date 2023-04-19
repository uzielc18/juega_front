import { NgModule } from '@angular/core';
import { PuntosComponent } from './puntos.component';
import { PuntosHomeComponent} from './containers/puntos-home.component';
import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";
import {PuntosRoutingModule} from "./puntos-routing.module";
import {NgxPrintModule} from "ngx-print";

const COMPONENTS: any[] = [
  PuntosHomeComponent,
  PuntosComponent,
];
const NG_MODULES: any = [
  NebularModule,
];
const NGB_MODULES: any = [
  NgxPrintModule,
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
    PuntosRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class PuntosModule { }
