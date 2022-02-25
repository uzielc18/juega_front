import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationsTeacherRoutingModule } from './evaluations-teacher-routing.module';
import { EvaluationsTeacherComponent } from './evaluations-teacher.component';
import { EvaluationsTeacherHomeComponent } from './containers/evaluations-teacher-home.component';

const COMPONENTS: any = [
  EvaluationsTeacherComponent,
  EvaluationsTeacherHomeComponent
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EvaluationsTeacherRoutingModule
  ]
})
export class EvaluationsTeacherModule { }
