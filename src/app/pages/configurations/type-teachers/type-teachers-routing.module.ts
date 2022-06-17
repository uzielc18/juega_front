import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TypeTeachersComponent} from "./type-teachers.component";
import {TypeTeachersHomeComponent} from "./containers/type-teachers-home/type-teachers-home.component";

const routes: Routes = [
  {
    path: '',
    component: TypeTeachersComponent,
    children: [
      {
        path: '',
        component: TypeTeachersHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeTeachersRoutingModule { }
