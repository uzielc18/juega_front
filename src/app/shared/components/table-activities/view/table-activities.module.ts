import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableActivitiesComponent } from './table-activities.component';
import {NebularModule} from "../../../nebular.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    TableActivitiesComponent
  ],
  exports: [
    TableActivitiesComponent
  ],
  imports: [
    CommonModule,
    NebularModule,
    NgbModule
  ]
})
export class TableActivitiesModule { }
