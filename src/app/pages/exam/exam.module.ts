import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import { ExamHomeComponent } from './containers/exam-home.component';
import { ExamComponent } from './exam.component';
import { NebularModule } from '../../shared/nebular.module';
import { VEstRelationComponent } from './components/v-est-relation/v-est-relation.component';
import { VEstMultiOptionComponent } from './components/v-est-multi-option/v-est-multi-option.component';
import { VEstUniqueOptionComponent } from './components/v-est-unique-option/v-est-unique-option.component';

const COMPONENTS: any = [
  ExamHomeComponent,
  ExamComponent,
  VEstRelationComponent,
  VEstMultiOptionComponent,
  VEstUniqueOptionComponent
]

const MODULES: any = [

]

const NEBULAR: any = [
  NebularModule
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    ExamRoutingModule,
    ...NEBULAR
  ]
})
export class ExamModule { }
