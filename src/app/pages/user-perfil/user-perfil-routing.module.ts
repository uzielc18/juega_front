import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserPerfilComponent} from "./user-perfil.component";
import {UserPerfilHomeComponent} from "./containers/user-perfil-home/user-perfil-home.component";

const routes: Routes = [
  {
    path: '',
    component: UserPerfilComponent,
    children: [
      {
        path: 'perfil/:email',
        component: UserPerfilHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPerfilRoutingModule { }
