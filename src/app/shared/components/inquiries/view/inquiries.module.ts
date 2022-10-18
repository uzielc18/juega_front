import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InquiriesComponent } from './inquiries.component';
import {NebularModule} from "../../../nebular.module";



@NgModule({
  declarations: [
    InquiriesComponent
  ],
  exports: [
    InquiriesComponent
  ],
  imports: [
    CommonModule,
    NebularModule
  ]
})
export class InquiriesModule { }
