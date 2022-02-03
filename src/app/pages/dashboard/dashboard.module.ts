import { NgModule } from '@angular/core';
import { GeneralService } from '../../providers';
import { NebularModule } from '../../shared/nebular.module';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DashboardHomeComponent } from './containers/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

const COMPONENTS: any[] = [
  DashboardComponent,
  DashboardHomeComponent,
  PerfilComponent
];
const NG_MODULES: any = [
  NebularModule,
];
const NGB_MODULES: any = [
  // NgbModule
];
const CONTROL_MESSAGGE: any = [
];
const SERVICES: any = [
  GeneralService
];
const MODALS: any = [
];
const NGX_MODULES: any = [
];
const PIPES: any = [
];
const MODULES: any = [
]

@NgModule({
  providers: [
    ...SERVICES,
  ],
  imports: [
    DashboardRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS, ...PIPES],
  entryComponents: [...MODALS],

})
export class DashboardModule { }
