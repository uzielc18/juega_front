import { NgModule } from '@angular/core';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { PagosComponent } from './pagos.component';
import { PagosHomeComponent } from './containers/pagos-home.component';
//import { MPagosComponent } from './components/modals/m-pagos/m-pagos.component';
import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";
import {PagosRoutingModule} from "./pagos-routing.module";

const COMPONENTS: any[] = [
  PagosHomeComponent,
  PagosComponent,
  //MPagosComponent
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
    PagosRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class PagosModule { }
