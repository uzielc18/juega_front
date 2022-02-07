import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities.component';
import { ActivitiesHomeComponent } from './containers/activities-home.component';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { NebularModule } from '../../shared/nebular.module';


@NgModule({
  declarations: [
    ActivitiesComponent,
    ActivitiesHomeComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    NebularModule
  ]
})
export class ActivitiesModule { }
