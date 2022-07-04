import { NgModule } from '@angular/core';
import { SemestersComponent } from './semesters.component';
import { SemestersHomeComponent } from './containers/semesters-home.component';
import { MSemestersComponent } from './components/modals/m-semesters/m-semesters.component';
import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";
import {SemestersRoutingModule} from "./semesters-routing.module";

const COMPONENTS: any[] = [
   SemestersHomeComponent,
   SemestersComponent,
   MSemestersComponent
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
  MSemestersComponent
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
    SemestersRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class SemestersModule { }
