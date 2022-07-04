import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TypeElementsComponent} from "./type-elements.component";
import {TypeElementsHomeComponent} from "./containers/type-elements-home.component";

const routes: Routes = [
  {
    path: '',
    component: TypeElementsComponent,
    children: [
      {
        path: '',
        component: TypeElementsHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeElementsRoutingModule { }
