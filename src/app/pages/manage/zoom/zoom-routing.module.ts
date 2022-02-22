import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VZoomValidateComponent } from './components/views/v-zoom-validate/v-zoom-validate.component';
import { ZoomHomeComponent } from './containers/zoom-home.component';
import { ZoomComponent } from './zoom.component';

const routes: Routes = [
  {
    path: '',
    component: ZoomComponent,
    children: [
      {
        path: '',
        component: ZoomHomeComponent,
      },
      {
        path: 'validate',
        component: VZoomValidateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZoomRoutingModule { }
