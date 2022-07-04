import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TypeRatingsComponent} from "./type-ratings.component";
import {TypeRatingsHomeComponent} from "./containers/type-ratings-home/type-ratings-home.component";

const routes: Routes = [
  {
    path: '',
    component: TypeRatingsComponent,
    children: [
      {
        path: '',
        component: TypeRatingsHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeRatingsRoutingModule { }
