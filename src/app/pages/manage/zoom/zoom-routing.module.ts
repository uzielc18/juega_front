import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZoomHomeComponent } from './containers/zoom-home.component';
import { ZoomComponent } from './zoom.component';

const routes: Routes = [
  {
    path: '',
    component: ZoomComponent,
    children: [
      {
        path: '',
        component: ZoomHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZoomRoutingModule { }
