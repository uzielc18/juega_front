import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities.component';
import { ActivitiesHomeComponent } from './containers/activities-home.component';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { NebularModule } from '../../shared/nebular.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


const COMPONENTS: any = [
  ActivitiesComponent,
  ActivitiesHomeComponent
]

const MODULES: any = [
  NgbPaginationModule
]

const NEBULAR: any = [
  NebularModule
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    ...NEBULAR,
    ...MODULES,
  ]
})
export class ActivitiesModule { }
