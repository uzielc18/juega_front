import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenusHomeComponent } from './containers/menus-home.component';
import { MenusComponent } from './menus.component';

const routes: Routes = [
  {
    path: '',
    component: MenusComponent,
    children: [
      {
        path: '',
        component: MenusHomeComponent,
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule { }
