import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MExamViewModalComponent } from './m-exam-view-modal.component';
import { NebularModule } from 'src/app/shared/nebular.module';
import { VExamViewsModule } from '../v-exam-views/v-exam-views.module';

const COMPONENTS: any = [
  MExamViewModalComponent
]
const MODALS: any = [
]
const MODULES: any = [
  // VideoPlayerModule
  VExamViewsModule
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
    ...MODULES,
    ...NEBULAR
  ],
  entryComponents: [...MODALS],
  exports: [MExamViewModalComponent]
})

export class MExamViewModalModule { }
