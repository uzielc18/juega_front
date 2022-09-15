import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswersQuestionsComponent } from './answers-questions.component';
import {NebularModule} from "../../../nebular.module";



@NgModule({
  declarations: [
    AnswersQuestionsComponent
  ],
  exports: [
    AnswersQuestionsComponent
  ],
  imports: [
    CommonModule,
    NebularModule
  ]
})
export class AnswersQuestionsModule { }
