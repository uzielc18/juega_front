import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriasComponent} from "./categorias.component";
import {CategoriasHomeComponent} from "./containers/categorias-home.component";

const routes: Routes = [
  {
    path: '',
    component: CategoriasComponent,
    children: [
      {
        path: '',
        component: CategoriasHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
