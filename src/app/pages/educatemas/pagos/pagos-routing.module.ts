import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PagosComponent} from "./pagos.component";
import {PagosHomeComponent} from "./containers/pagos-home.component";

const routes: Routes = [
  {
    path: '',
    component: PagosComponent,
    children: [
      {
        path: '',
        component: PagosHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagosRoutingModule { }
