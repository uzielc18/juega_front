import { NgModule } from '@angular/core';
import { EncuentrosComponent } from './encuentros.component';
import { EncuentrosHomeComponent} from './containers/encuentros-home.component';
import { MEncuentrosComponent } from './components/modals/m-encuentros/m-encuentros.component';
import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";
import {EncuentrosRoutingModule} from "./encuentros-routing.module";
import {MNewEncuentrosComponent} from "./components/modals/m-new-encuentros/m-new-encuentros.component";

const COMPONENTS: any[] = [
  EncuentrosHomeComponent,
  EncuentrosComponent,
  MEncuentrosComponent,
  MNewEncuentrosComponent
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
    EncuentrosRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class EncuentrosModule { }
