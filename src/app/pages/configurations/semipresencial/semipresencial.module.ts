import { NgModule } from '@angular/core';
import { SemipresencialComponent } from './semipresencial.component';
import { MSemipresencialComponent} from './components/modals/m-semipresencial/m-semipresencial.component';
import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";
import {SemipresencialRoutingModule} from "./semipresencial-routing.module";
import {SemipresencialHomeComponent} from "./containers/semipresencial-home.component";

const COMPONENTS: any[] = [
  SemipresencialComponent,
  SemipresencialHomeComponent,
  MSemipresencialComponent
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
    SemipresencialRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class SemipresencialModule { }
