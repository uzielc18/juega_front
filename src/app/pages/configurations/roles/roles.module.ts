import { NgModule } from '@angular/core';
import { RolesComponent } from './roles.component';
import { RolesHomeComponent } from './containers/roles-home.component';
import { MRolesComponent } from './components/modals/m-roles/m-roles.component';
import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";
import {RolesRoutingModule} from "./roles-routing.module";

const COMPONENTS: any[] = [
  RolesHomeComponent,
  RolesComponent,
  MRolesComponent
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
    RolesRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class RolesModule { }
