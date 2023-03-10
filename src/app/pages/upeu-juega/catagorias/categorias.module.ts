import { NgModule } from '@angular/core';
import { CategoriasComponent } from './categorias.component';
import { CategoriasHomeComponent} from './containers/categorias-home.component';
import { MCategoriasComponent } from './components/modals/m-categorias/m-categorias.component';
import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";
import {CategoriasRoutingModule} from "./categorias-routing.module";

const COMPONENTS: any[] = [
  CategoriasHomeComponent,
  CategoriasComponent,
  MCategoriasComponent
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
    CategoriasRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class CategoriasModule { }
