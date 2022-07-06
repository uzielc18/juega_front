import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementHomeComponent } from './containers/element-home.component';
import { ElementComponent } from './element.component';

const routes: Routes = [
  {
    path: '',
    component: ElementComponent,
    children: [
      {
        path: '',
        component: ElementHomeComponent,
      },
      // {
      //   path: '',
      //   redirectTo: '',
      //   pathMatch: 'full',
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElementRoutingModule {}