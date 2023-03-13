import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EquiposComponent} from "./equipos.component";
import {EquiposHomeComponent} from "./containers/equipos-home.component";

const routes: Routes = [
  {
    path: '',
    component: EquiposComponent,
    children: [
      {
        path: '',
        component: EquiposHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquiposRoutingModule { }
