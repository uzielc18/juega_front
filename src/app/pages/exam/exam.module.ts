import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import { ExamHomeComponent } from './containers/exam-home.component';
import { ExamComponent } from './exam.component';
import { NebularModule } from '../../shared/nebular.module';
import { VEstRelationComponent } from './components/v-est-relation/v-est-relation.component';
import { VEstMultiOptionComponent } from './components/v-est-multi-option/v-est-multi-option.component';
import { VEstUniqueOptionComponent } from './components/v-est-unique-option/v-est-unique-option.component';
import { VideoPlayerModule } from '../../shared/components/video-player/video-player.module';
import { VEstClosedComponent } from './components/v-est-closed/v-est-closed.component';
import { VEstOpenComponent } from './components/v-est-open/v-est-open.component';
import { VEstTrueFalseComponent } from './components/v-est-true-false/v-est-true-false.component';
import { ConfirmFinishExamComponent } from './components/modals/confirm-finish-exam/confirm-finish-exam.component';

const COMPONENTS: any = [
  ExamHomeComponent,
  ExamComponent,
  VEstRelationComponent,
  VEstMultiOptionComponent,
  VEstUniqueOptionComponent,
  VEstClosedComponent,
  VEstOpenComponent,
  VEstTrueFalseComponent,
  ConfirmFinishExamComponent
]
const MODALS: any = [
  ConfirmFinishExamComponent
]
const MODULES: any = [
  VideoPlayerModule
]

const NEBULAR: any = [
  NebularModule
]

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    ExamRoutingModule,
    ...MODULES,
    ...NEBULAR
  ],
  entryComponents: [...MODALS],
})
export class ExamModule { }
