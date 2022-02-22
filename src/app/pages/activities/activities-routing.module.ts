import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './activities.component';
import { ActivitiesHomeComponent } from './containers/activities-home.component';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesComponent,
    children: [
      {
        path: '',
        component: ActivitiesHomeComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
