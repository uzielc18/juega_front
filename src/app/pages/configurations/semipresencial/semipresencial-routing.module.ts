import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SemipresencialComponent} from "./semipresencial.component";
import {SemipresencialHomeComponent} from "./containers/semipresencial-home.component";

const routes: Routes = [
  {
    path: '',
    component: SemipresencialComponent,
    children: [
      {
        path: '',
        component: SemipresencialHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SemipresencialRoutingModule { }
