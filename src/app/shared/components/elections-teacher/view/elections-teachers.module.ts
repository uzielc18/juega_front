import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectionsTeachersComponent } from './elections-teachers.component';
import {NebularModule} from "../../../nebular.module";



@NgModule({
  declarations: [
    ElectionsTeachersComponent
  ],
  exports: [ElectionsTeachersComponent],
  imports: [
    CommonModule,
    NebularModule
  ]
})
export class ElectionsTeachersModule { }
