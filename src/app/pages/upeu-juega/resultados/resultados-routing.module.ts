import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ResultadosComponent} from "./resultados.component";
import {ResultadosHomeComponent} from "./containers/resultados-home.component";

const routes: Routes = [
  {
    path: '',
    component: ResultadosComponent,
    children: [
      {
        path: '',
        component: ResultadosHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadosRoutingModule { }
