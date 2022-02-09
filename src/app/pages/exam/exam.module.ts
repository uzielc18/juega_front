import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './exam.component';
import { ExamRoutingModule } from './exam-routing.module';
const ANGULAR: any[] = [CommonModule];
const COMPONENTS: any = [
  ExamComponent
];
const NEBULAR: any = [
];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...ANGULAR,
    ...NEBULAR,
    ExamRoutingModule
  ], 
  exports: [...COMPONENTS]
})
export class ExamModule { }
