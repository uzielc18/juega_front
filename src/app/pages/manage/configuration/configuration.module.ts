import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { ConfigutarionHomeComponent } from './containers/configutarion-home.component';
import { NebularModule } from 'src/app/shared/nebular.module';
import { ControlMessagesModule } from 'src/app/shared/components/control-messages/control-messages.module';
import { GeneralService } from 'src/app/providers';
import { MConfigurationComponent } from './components/modals/m-configuration/m-configuration.component';

const COMPONENTS: any[] = [
  ConfigurationComponent,
  ConfigutarionHomeComponent,
  MConfigurationComponent
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
  MConfigurationComponent
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
    ConfigurationRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})

export class ConfigurationModule { }
