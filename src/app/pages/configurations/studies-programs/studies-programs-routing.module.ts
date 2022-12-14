import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudiesProgramsComponent} from "./studies-programs.component";
import {StudiesProgramsHomeComponent} from "./containers/studies-programs-home.component";

const routes: Routes = [
  {
    path: '',
    component: StudiesProgramsComponent,
    children: [
      {
        path: '',
        component: StudiesProgramsHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudiesProgramsRoutingModule { }
