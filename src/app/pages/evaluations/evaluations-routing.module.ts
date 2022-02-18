import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationsHomeComponent } from './containers/evaluations-home.component';
import { EvaluationsComponent } from './evaluations.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluationsComponent,
    children: [
      {
        path: '',
        component: EvaluationsHomeComponent,
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationsRoutingModule { }
