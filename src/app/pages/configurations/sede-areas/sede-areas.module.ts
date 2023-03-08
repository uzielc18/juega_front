import { NgModule } from '@angular/core';
import { SedeAreasComponent } from './sede-areas.component';
import { SedeAreasHomeComponent } from './containers/sede-areas-home.component';
import { MSedeAreasComponent } from './components/modals/m-sede-areas/m-sede-areas.component';
import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";
import {SedeAreasRoutingModule} from "./sede-areas-routing.module";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";

const COMPONENTS: any[] = [
  SedeAreasHomeComponent,
  SedeAreasComponent,
  MSedeAreasComponent
];
const NG_MODULES: any = [
  NebularModule,
];
const NGB_MODULES: any = [
  NgbPaginationModule,
  // NgbTypeaheadModule
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
    SedeAreasRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class SedeAreasModule { }
