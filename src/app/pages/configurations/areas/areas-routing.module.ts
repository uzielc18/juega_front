import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AreasComponent} from "./areas.component";
import {AreasHomeComponent} from "./containers/areas-home.component";

const routes: Routes = [
  {
    path: '',
    component: AreasComponent,
    children: [
      {
        path: '',
        component: AreasHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreasRoutingModule { }
