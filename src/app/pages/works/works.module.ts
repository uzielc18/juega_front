import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorksRoutingModule } from './works-routing.module';
import { WorksComponent } from './works.component';
import { WorksHomeComponent } from './containers/works-home.component';
import {TableActivitiesModule} from "../../shared/components/table-activities/view/table-activities.module";


@NgModule({
  declarations: [
    WorksComponent,
    WorksHomeComponent
  ],
    imports: [
        CommonModule,
        WorksRoutingModule,
        TableActivitiesModule
    ]
})
export class WorksModule { }
