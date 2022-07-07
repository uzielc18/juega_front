import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AperturaRequestComponent } from './apertura-request.component';
import {NebularModule} from "../../../nebular.module";



@NgModule({
  declarations: [
    AperturaRequestComponent
  ],
  imports: [
    CommonModule,
    NebularModule
  ]
})
export class AperturaRequestModule { }
