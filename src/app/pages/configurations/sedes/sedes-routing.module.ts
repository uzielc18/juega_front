import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SedesComponent} from "./sedes.component";
import {SedesHomeComponent} from "./containers/sedes-home.component";

const routes: Routes = [
  {
    path: '',
    component: SedesComponent,
    children: [
      {
        path: '',
        component: SedesHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SedesRoutingModule { }
