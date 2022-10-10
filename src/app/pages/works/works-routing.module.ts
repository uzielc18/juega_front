import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorksComponent} from "./works.component";
import {WorksHomeComponent} from "./containers/works-home.component";

const routes: Routes = [
  {
    path: '',
    component: WorksComponent,
    children: [
      {
        path: '',
        component: WorksHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorksRoutingModule { }
