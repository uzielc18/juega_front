import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamHomeComponent } from './containers/exam-home.component';
import { ExamComponent } from './exam.component';

const routes: Routes = [
  {
    path: '',
    component: ExamComponent,
    children: [
      {
        path: '',
        component: ExamHomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
