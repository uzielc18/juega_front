import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswersQuestionsComponent } from './answers-questions.component';
import {NebularModule} from "../../../nebular.module";
import { MAnswersQuestionsComponent } from './components/modals/m-answers-questions/m-answers-questions.component';
import {TranslateLangModule} from "../../../moduls/translate-lang/translate-lang.module";
import {ReactCommentModule} from "../../react-comments/view/react-comment.module";
import {PickerModule} from "@ctrl/ngx-emoji-mart";



@NgModule({
  declarations: [
    AnswersQuestionsComponent,
    MAnswersQuestionsComponent
  ],
  exports: [
    AnswersQuestionsComponent
  ],
    imports: [
        CommonModule,
        NebularModule,
        TranslateLangModule,
        ReactCommentModule,
        PickerModule
    ]
})
export class AnswersQuestionsModule { }
