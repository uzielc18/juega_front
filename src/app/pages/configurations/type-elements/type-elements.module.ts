import { NgModule } from '@angular/core';

import { TypeElementsRoutingModule } from './type-elements-routing.module';
import { TypeElementsComponent } from './type-elements.component';
import { TypeElementsHomeComponent } from './containers/type-elements-home.component';
import { MTypeElementsComponent } from './components/modals/m-type-elements/m-type-elements.component';
import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";

const COMPONENTS: any[] = [
  TypeElementsComponent,
  TypeElementsHomeComponent,
  MTypeElementsComponent
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
  MTypeElementsComponent
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
    TypeElementsRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class TypeElementsModule { }
