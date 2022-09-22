import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportCourseRoutingModule } from './report-course-routing.module';
import { ReportCourseComponent } from './report-course.component';
import { ReportCourseHomeComponent } from './containers/report-course-home.component';
import {NebularModule} from "../../../shared/nebular.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";
import {FilterPipeModule} from "../../../shared/pipes/filterPipe/filterPipe.module";
import {NbTagModule} from "@nebular/theme";
import {FilterModule} from "../../../shared/pipes/filter/filter.module";
import {DirectiveModule} from "../../../shared/directives/highlight.module";
import {NgxPrintModule} from "ngx-print";

const COMPONENTS: any[] = [
  ReportCourseComponent,
  ReportCourseHomeComponent
];
const NG_MODULES: any = [
  NebularModule,
];
const NGB_MODULES: any = [
  NgbModule,
  NbTagModule,
  FilterModule,
  DirectiveModule,
  NgxPrintModule
];
const CONTROL_MESSAGGE: any = [
  ControlMessagesModule,
];
const SERIVCES: any = [
  GeneralService,
];
const MODALS: any = [
];
const NGX_MODULES: any = [
];
const MODULES: any = [
];
const PIPES: any = [
  FilterPipeModule,
];

@NgModule({
  providers: [
    ...SERIVCES,
  ],
    imports: [
        ReportCourseRoutingModule,
        CommonModule,
        ...NG_MODULES,
        ...NGB_MODULES,
        ...CONTROL_MESSAGGE,
        ...NGX_MODULES,
        ...MODULES,
        ...PIPES,
    ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class ReportCourseModule { }
