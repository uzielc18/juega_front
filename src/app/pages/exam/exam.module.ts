import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './exam.component';
import { ExamRoutingModule } from './exam-routing.module';
import { NbButton, NbCardModule, NbLayoutModule } from '@nebular/theme';
import { ExamHomeComponent } from './containers/exam-home.component';
import { VEstMultiOptionComponent } from './components/v-est-multi-option/v-est-multi-option.component';
import { VEstUniqueOptionComponent } from './components/v-est-unique-option/v-est-unique-option.component';
const ANGULAR: any[] = [CommonModule];
const COMPONENTS: any = [
  ExamComponent,
  ExamHomeComponent,
  VEstMultiOptionComponent,
  VEstUniqueOptionComponent
];
const NEBULAR: any = [
  NbLayoutModule,
  NbCardModule,
  NbButton
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
