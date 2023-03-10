import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EncuentrosComponent} from "./encuentros.component";
import {EncuentrosHomeComponent} from "./containers/encuentros-home.component";

const routes: Routes = [
  {
    path: '',
    component: EncuentrosComponent,
    children: [
      {
        path: '',
        component: EncuentrosHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncuentrosRoutingModule { }
