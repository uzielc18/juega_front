import { NgModule } from '@angular/core';
import { MenusRoutingModule } from './menus-routing.module';
import { NebularModule } from 'src/app/shared/nebular.module';
import { ControlMessagesModule } from 'src/app/shared/components/control-messages/control-messages.module';
import { GeneralService } from 'src/app/providers';
import { MenusComponent } from './menus.component';
import { MenusHomeComponent } from './containers/menus-home.component';
import { MMenuMComponent } from './components/modals/m-menu-m/m-menu-m.component';
// import { NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';

const COMPONENTS: any[] = [
  MenusComponent,
  MenusHomeComponent,
  MMenuMComponent
];
const NG_MODULES: any = [
  NebularModule,
];
const NGB_MODULES: any = [
  // NgbModule,
  // NgbPopover
];
const CONTROL_MESSAGGE: any = [
  ControlMessagesModule,
];
const SERIVCES: any = [
  GeneralService,
];
const MODALS: any = [
  MMenuMComponent
];
const NGX_MODULES: any = [
];
const MODULES: any = [
];
const PIPES: any = [
];
@NgModule({
  providers: [
    ...SERIVCES,
  ],
  imports: [
    MenusRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
    ...PIPES
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})

export class MenusModule { }
