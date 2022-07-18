import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MNoteWorksHomeComponent } from './m-note-works-home.component';
import {NebularModule} from "../../../nebular.module";
import {NoteWorksModule} from "../view/note-works.module";



@NgModule({
  declarations: [
    MNoteWorksHomeComponent
  ],
  imports: [
    CommonModule,
    NebularModule,
    NoteWorksModule
  ],
  exports: [
    MNoteWorksHomeComponent
  ]
})
export class MNoteWorksHomeModule { }
