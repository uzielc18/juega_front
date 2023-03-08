import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SedeAreasComponent} from "./sede-areas.component";
import {SedeAreasHomeComponent} from "./containers/sede-areas-home.component";

const routes: Routes = [
  {
    path: '',
    component: SedeAreasComponent,
    children: [
      {
        path: '',
        component: SedeAreasHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SedeAreasRoutingModule { }
