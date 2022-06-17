import { NgModule } from '@angular/core';
import { TypeRatingsRoutingModule } from './type-ratings-routing.module';
import { TypeRatingsComponent } from './type-ratings.component';
import { TypeRatingsHomeComponent } from './containers/type-ratings-home/type-ratings-home.component';
import { MTypeRatingsComponent } from './components/modals/m-type-ratings/m-type-ratings.component';
import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";

const COMPONENTS: any[] = [
  TypeRatingsComponent,
  TypeRatingsHomeComponent,
  MTypeRatingsComponent
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
  MTypeRatingsComponent
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
    TypeRatingsRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})

export class TypeRatingsModule { }
