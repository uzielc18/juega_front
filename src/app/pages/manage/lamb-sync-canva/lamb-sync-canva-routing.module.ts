import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LambSyncCanvaComponent} from "./lamb-sync-canva.component";
import {LambSyncCanvaHomeComponent} from "./containers/lamb-sync-canva-home.component";

const routes: Routes = [
  {
    path: '',
    component: LambSyncCanvaComponent,
    children: [
      {
        path: '',
        component: LambSyncCanvaHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LambSyncCanvaRoutingModule { }
