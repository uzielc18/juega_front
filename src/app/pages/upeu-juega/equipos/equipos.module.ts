import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquiposRoutingModule } from './equipos-routing.module';
import { EquiposHomeComponent } from './containers/equipos-home.component';
import {EquiposComponent} from "./equipos.component";
import {NbCardModule, NbIconModule} from "@nebular/theme";
import {NebularModule} from "../../../shared/nebular.module";
import { TabsEquiposListComponent } from './components/views/tabs-equipos-list/tabs-equipos-list.component';
import { MEquiposComponent } from './components/modals/m-equipos/m-equipos.component';


@NgModule({
  declarations: [
    EquiposComponent,
    EquiposHomeComponent,
    TabsEquiposListComponent,
    MEquiposComponent
  ],
  imports: [
    CommonModule,
    EquiposRoutingModule,
    NbCardModule,
    NbIconModule,
    NebularModule
  ]
})
export class EquiposModule { }
