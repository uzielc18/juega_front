import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumsRoutingModule } from './forums-routing.module';
import { ForumsComponent } from './forums.component';
import { ForumsHomeComponent } from './containers/forums-home.component';
import {TableActivitiesModule} from "../../shared/components/table-activities/view/table-activities.module";
import {NebularModule} from "../../shared/nebular.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    ForumsComponent,
    ForumsHomeComponent
  ],
  imports: [
    CommonModule,
    ForumsRoutingModule,
    TableActivitiesModule,
    NebularModule,
    NgbModule
  ]
})
export class ForumsModule { }
