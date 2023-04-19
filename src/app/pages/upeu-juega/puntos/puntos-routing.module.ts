import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PuntosComponent} from "./puntos.component";
import {PuntosHomeComponent} from "./containers/puntos-home.component";

const routes: Routes = [
  {
    path: '',
    component: PuntosComponent,
    children: [
      {
        path: '',
        component: PuntosHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuntosRoutingModule { }
