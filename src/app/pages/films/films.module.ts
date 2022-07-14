import { NgModule } from '@angular/core';

import { FilmsRoutingModule } from './films-routing.module';
import { FilmsComponent } from './films.component';
import { FilmsHomeComponent } from './containers/films-home.component';
import { MAddSessionComponent } from './components/modals/m-add-session/m-add-session.component';
import {NebularModule} from "../../shared/nebular.module";
import {ControlMessagesModule} from "../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../providers";

const COMPONENTS: any[] = [
  FilmsComponent,
  FilmsHomeComponent,
  MAddSessionComponent
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
  MAddSessionComponent
];
const NGX_MODULES: any = [
];
const MODULES: any = [
];

@NgModule({
  providers: [
    ...SERIVCES,
  ],
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    FilmsRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  entryComponents: [...MODALS],
})
export class FilmsModule { }
