import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportErrorsRoutingModule } from './report-errors-routing.module';
import { ReportErrorsComponent } from './report-errors.component';
import { ReportErrorsHomeComponent } from './containers/report-errors-home.component';
import {NebularModule} from "../../../shared/nebular.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxPrintModule} from "ngx-print";


@NgModule({
  declarations: [
    ReportErrorsComponent,
    ReportErrorsHomeComponent
  ],
  imports: [
    CommonModule,
    ReportErrorsRoutingModule,
    NebularModule,
    NgbModule,
    NgxPrintModule
  ]
})
export class ReportErrorsModule { }
