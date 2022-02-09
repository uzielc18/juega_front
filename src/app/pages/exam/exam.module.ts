import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './exam.component';
import { ExamRoutingModule } from './exam-routing.module';
import { VEstUniqueOptionComponent } from './v-est-unique-option/v-est-unique-option.component';
import { VEstMultiOptionComponent } from './v-est-multi-option/v-est-multi-option.component';
const ANGULAR: any[] = [CommonModule];
const COMPONENTS: any = [
  ExamComponent,
  VEstUniqueOptionComponent,
  VEstMultiOptionComponent
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
