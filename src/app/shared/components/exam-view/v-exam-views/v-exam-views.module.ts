import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClosedComponent } from './components/closed/closed.component';
import { OpenComponent } from './components/open/open.component';
import { MultiComponent } from './components/multi/multi.component';
import { TrueFalseComponent } from './components/true-false/true-false.component';
import { RelationComponent } from './components/relation/relation.component';
import { UniqueComponent } from './components/unique/unique.component';
import { NebularModule } from 'src/app/shared/nebular.module';
import { VExamViewsComponent } from './v-exam-views.component';

const COMPONENTS: any = [
  VExamViewsComponent,
  ClosedComponent,
  OpenComponent,
  MultiComponent,
  TrueFalseComponent,
  RelationComponent,
  UniqueComponent
]
const MODALS: any = [
]
const MODULES: any = [
  // VideoPlayerModule
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
  exports: [VExamViewsComponent]
})

export class VExamViewsModule { }
