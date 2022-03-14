import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationsTeacherRoutingModule } from './evaluations-teacher-routing.module';
import { EvaluationsTeacherComponent } from './evaluations-teacher.component';
import { EvaluationsTeacherHomeComponent } from './containers/evaluations-teacher-home.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NebularModule } from '../../shared/nebular.module';

const COMPONENTS: any = [
  EvaluationsTeacherComponent,
  EvaluationsTeacherHomeComponent
]
const MODULES: any = [
  NgbPaginationModule
]

const NEBULAR: any = [
  NebularModule
]


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    EvaluationsTeacherRoutingModule,
    ...NEBULAR,
    ...MODULES,
  ]
})
export class EvaluationsTeacherModule { }
