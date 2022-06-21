import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursesTypesComponent} from "./courses-types.component";
import {CoursesTypeHomeComponent} from "./containers/courses-type-home.component";

const routes: Routes = [
  {
    path: '',
    component: CoursesTypesComponent,
    children: [
      {
        path: '',
        component: CoursesTypeHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesTypesRoutingModule { }
