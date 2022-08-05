import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteWorksComponent } from './note-works.component';
import {NebularModule} from "../../../nebular.module";
import {NgxPrintModule} from "ngx-print";



@NgModule({
  declarations: [
    NoteWorksComponent,

  ],
  exports: [
    NoteWorksComponent
  ],
    imports: [
        CommonModule,
        NebularModule,
        NgxPrintModule
    ]
})
export class NoteWorksModule { }
