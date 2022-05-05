import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationsTeacherHomeComponent } from './containers/evaluations-teacher-home.component';
import { EvaluationsTeacherComponent } from './evaluations-teacher.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluationsTeacherComponent,
    children: [
      {
        path: '',
        component: EvaluationsTeacherHomeComponent,
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationsTeacherRoutingModule { }
