import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MInquiriesComponent } from './m-inquiries.component';
import {NebularModule} from "../../../nebular.module";
import {InquiriesModule} from "../view/inquiries.module";



@NgModule({
  declarations: [
    MInquiriesComponent
  ],
  exports :[
    MInquiriesComponent
  ],
  imports: [
    CommonModule,
    NebularModule,
    InquiriesModule
  ]
})
export class MInquiriesModule { }
