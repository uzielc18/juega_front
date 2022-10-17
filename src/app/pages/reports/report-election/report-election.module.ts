import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportElectionRoutingModule } from './report-election-routing.module';
import { ReportElectionComponent } from './report-election.component';
import { ReportElectionHomeComponent } from './containers/report-election-home.component';
import {ReportCourseComponent} from "../report-course/report-course.component";
import {ReportCourseHomeComponent} from "../report-course/containers/report-course-home.component";
import {NebularModule} from "../../../shared/nebular.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NbTagModule} from "@nebular/theme";
import {FilterModule} from "../../../shared/pipes/filter/filter.module";
import {DirectiveModule} from "../../../shared/directives/highlight.module";
import {NgxPrintModule} from "ngx-print";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";
import {FilterPipeModule} from "../../../shared/pipes/filterPipe/filterPipe.module";
import {ReportCourseRoutingModule} from "../report-course/report-course-routing.module";
import {Ng2ChartsComponentModule} from "../../../shared/components/ng2-charts/view/ng2-charts-component.module";

const COMPONENTS: any[] = [
  ReportElectionHomeComponent,
  ReportElectionComponent
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
    ReportElectionRoutingModule,
    CommonModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
    ...PIPES,
    Ng2ChartsComponentModule,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})
export class ReportElectionModule { }
