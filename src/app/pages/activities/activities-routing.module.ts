import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignaturesComponent } from '../asignatures/asignatures.component';
import { AsignaturesHomeComponent } from '../asignatures/containers/asignatures-home.component';
import { ActivitiesComponent } from './activities.component';
import { ActivitiesHomeComponent } from './containers/activities-home.component';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesHomeComponent,
    children: [
      {
        path: '',
        component: ActivitiesComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
