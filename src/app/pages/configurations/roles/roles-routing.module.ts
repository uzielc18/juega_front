import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RolesComponent} from "./roles.component";
import {RolesHomeComponent} from "./containers/roles-home.component";

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    children: [
      {
        path: '',
        component: RolesHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
