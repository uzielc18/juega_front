import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudiesProgramsRoutingModule } from './studies-programs-routing.module';
import { StudiesProgramsComponent } from './studies-programs.component';
import { StudiesProgramsHomeComponent } from './containers/studies-programs-home.component';
import {NebularModule} from "../../../shared/nebular.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { MdStudiesProgramsComponent } from './components/md-studies-programs/md-studies-programs.component';


@NgModule({
  declarations: [
    StudiesProgramsComponent,
    StudiesProgramsHomeComponent,
    MdStudiesProgramsComponent
  ],
  imports: [
    CommonModule,
    StudiesProgramsRoutingModule,
    NebularModule,
    NgbModule
  ]
})
export class StudiesProgramsModule { }
