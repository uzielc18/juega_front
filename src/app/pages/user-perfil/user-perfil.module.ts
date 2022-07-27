import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPerfilRoutingModule } from './user-perfil-routing.module';
import { UserPerfilComponent } from './user-perfil.component';
import { UserPerfilHomeComponent } from './containers/user-perfil-home/user-perfil-home.component';
import {NebularModule} from "../../shared/nebular.module";
import {CardListCourseModule} from "../../shared/components/card-list-course/card-list-course.module";
import { PerfilComponent } from './components/perfil/perfil.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { TabsReporteNotasComponent } from './components/tabs/tabs-reporte-notas/tabs-reporte-notas.component';
import {NgxPrintModule} from "ngx-print";
const COMPONENTS: any[] = [

]

@NgModule({
  declarations: [
    UserPerfilComponent,
    UserPerfilHomeComponent,
    PerfilComponent,
    TabsReporteNotasComponent
  ],
  imports: [
    CommonModule,
    UserPerfilRoutingModule,
    NebularModule,
    CardListCourseModule,
    NgbModule,
    NgxPrintModule
  ]
})
export class UserPerfilModule { }
