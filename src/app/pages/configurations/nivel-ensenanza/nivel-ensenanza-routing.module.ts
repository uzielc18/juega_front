import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NivelEnsenanzaComponent} from "./nivel-ensenanza.component";
import {NivelEnsenanzaHomeComponent} from "./containers/nivel-ensenanza-home.component";

const routes: Routes = [
  {
    path: '',
    component: NivelEnsenanzaComponent,
    children: [
      {
        path: '',
        component: NivelEnsenanzaHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NivelEnsenanzaRoutingModule { }
