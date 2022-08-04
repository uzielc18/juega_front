import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SatisfactionComponent } from './satisfaction.component';
import {NebularModule} from "../../../nebular.module";



@NgModule({
  declarations: [
    SatisfactionComponent
  ],
  exports: [
    SatisfactionComponent
  ],
  imports: [
    CommonModule,
    NebularModule
  ]
})
export class SatisfactionModule { }
