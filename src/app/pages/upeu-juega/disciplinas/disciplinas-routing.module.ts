import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DisciplinasComponent} from "./disciplinas.component";
import {DisciplinasHomeComponent} from "./containers/disciplinas-home.component";

const routes: Routes = [
  {
    path: '',
    component: DisciplinasComponent,
    children: [
      {
        path: '',
        component: DisciplinasHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisciplinasRoutingModule { }
