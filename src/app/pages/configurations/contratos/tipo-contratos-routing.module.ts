import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TipoContratosComponent} from "./tipo-contratos.component";
import {TipoContratosHomeComponent} from "./containers/tipo-contratos-home.component";

const routes: Routes = [
  {
    path: '',
    component: TipoContratosComponent,
    children: [
      {
        path: '',
        component: TipoContratosHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoContratosRoutingModule { }
