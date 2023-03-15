import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CampeonatosComponent} from "./campeonatos.component";
import {CampeonatosHomeComponent} from "./containers/campeonatos-home.component";

const routes: Routes = [
  {
    path: '',
    component: CampeonatosComponent,
    children: [
      {
        path: '',
        component: CampeonatosHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampeonatosRoutingModule { }
