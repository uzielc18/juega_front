import { NgModule } from '@angular/core';
import { CategoriesComponent } from './categories.component';
import { CategoriesHomeComponent } from './containers/categories-home.component';
import { MCategoriesComponent } from './components/modals/m-categories/m-categories.component';
import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";
import {CategoriesRoutingModule} from "./categories-routing.module";

const COMPONENTS: any[] = [
  CategoriesHomeComponent,
  CategoriesComponent,
  MCategoriesComponent
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
    CategoriesRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class CategoriesModule { }
