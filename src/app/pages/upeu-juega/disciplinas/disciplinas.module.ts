import { NgModule } from '@angular/core';
import { DisciplinasComponent } from './disciplinas.component';
import { DisciplinasHomeComponent} from './containers/disciplinas-home.component';
import { MDisciplinasComponent } from './components/modals/m-disciplinas/m-disciplinas.component';
import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";
import {DisciplinasRoutingModule} from "./disciplinas-routing.module";

const COMPONENTS: any[] = [
  DisciplinasHomeComponent,
  DisciplinasComponent,
  MDisciplinasComponent
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
    DisciplinasRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class DisciplinasModule { }
