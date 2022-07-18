import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteWorksComponent } from './note-works.component';
import {NebularModule} from "../../../nebular.module";



@NgModule({
  declarations: [
    NoteWorksComponent,

  ],
  exports: [
    NoteWorksComponent
  ],
  imports: [
    CommonModule,
    NebularModule
  ]
})
export class NoteWorksModule { }
