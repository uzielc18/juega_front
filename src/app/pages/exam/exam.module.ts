import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import { ExamHomeComponent } from './containers/exam-home.component';
import { ExamComponent } from './exam.component';
import { NebularModule } from '../../shared/nebular.module';


@NgModule({
  declarations: [
    ExamHomeComponent,
    ExamComponent
  ],
  imports: [
    CommonModule,
    ExamRoutingModule,
    NebularModule
  ]
})
export class ExamModule { }
