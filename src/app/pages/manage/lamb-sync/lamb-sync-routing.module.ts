import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LambSyncHomeComponent } from './containers/lamb-sync-home.component';
import { LambSyncComponent } from './lamb-sync.component';

const routes: Routes = [
  {
    path: '',
    component: LambSyncComponent,
    children: [
      {
        path: '',
        component: LambSyncHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LambSyncRoutingModule { }
