import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TipoProgramasComponent} from "./tipo-programas.component";
import {TipoProgramasHomeComponent} from "./containers/tipo-programas-home.component";

const routes: Routes = [
  {
    path: '',
    component: TipoProgramasComponent,
    children: [
      {
        path: '',
        component: TipoProgramasHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoProgramasRoutingModule { }
