import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FilmsComponent} from "./films.component";
import {FilmsHomeComponent} from "./containers/films-home.component";

const routes: Routes = [
  {
    path: '',
    component: FilmsComponent,
    children: [
      {
        path: '',
        component: FilmsHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
