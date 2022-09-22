import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportAccessRoutingModule } from './report-access-routing.module';
import { ReportAccessComponent } from './report-access.component';
import { ReportAccessHomeComponent } from './containers/report-access-home.component';
import {NebularModule} from "../../../shared/nebular.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxPrintModule} from "ngx-print";


@NgModule({
  declarations: [
    ReportAccessComponent,
    ReportAccessHomeComponent
  ],
  imports: [
    CommonModule,
    ReportAccessRoutingModule,
    NebularModule,
    NgbModule,
    NgxPrintModule
  ]
})
export class ReportAccessModule { }
