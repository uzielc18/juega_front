import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ForumsComponent} from "./forums.component";
import {ForumsHomeComponent} from "./containers/forums-home.component";

const routes: Routes = [
  {
    path: '',
    component: ForumsComponent,
    children: [
      {
        path: '',
        component: ForumsHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumsRoutingModule { }
