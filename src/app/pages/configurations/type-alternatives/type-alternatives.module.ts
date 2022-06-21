import { NgModule } from '@angular/core';
import { TypeAlternativesComponent } from './type-alternatives.component';
import { TypeAlternativesHomeComponent } from './containers/type-alternatives-home.component';
import { MTypeAlternativesComponent } from './components/modals/m-type-alternatives/m-type-alternatives.component';
import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";
import {TypeAlternativesRoutingModule} from "./type-alternatives-routing.module";

const COMPONENTS: any[] = [
  TypeAlternativesComponent,
  TypeAlternativesHomeComponent,
  MTypeAlternativesComponent
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
  MTypeAlternativesComponent
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
    TypeAlternativesRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class TypeAlternativesModule { }
