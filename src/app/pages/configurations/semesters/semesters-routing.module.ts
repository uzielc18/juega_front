import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SemestersComponent} from "./semesters.component";
import {SemestersHomeComponent} from "./containers/semesters-home.component";

const routes: Routes = [
  {
    path: '',
    component: SemestersComponent,
    children: [
      {
        path: '',
        component: SemestersHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SemestersRoutingModule { }
