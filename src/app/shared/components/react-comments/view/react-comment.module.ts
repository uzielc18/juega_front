import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactCommentComponent } from './react-comment.component';
import {NebularModule} from "../../../nebular.module";



@NgModule({
  declarations: [
    ReactCommentComponent
  ],
  exports: [ReactCommentComponent],
  imports: [
    CommonModule,
    NebularModule
  ]
})
export class ReactCommentModule { }
