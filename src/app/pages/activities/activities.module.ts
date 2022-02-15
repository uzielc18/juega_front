import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities.component';
import { ActivitiesHomeComponent } from './containers/activities-home.component';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { NebularModule } from '../../shared/nebular.module';
import { QViewModule } from '../../shared/components/questions/q-view/q-view.module';


const COMPONENTS: any = [
  ActivitiesComponent,
  ActivitiesHomeComponent
]

const MODULES: any = [
  QViewModule
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
