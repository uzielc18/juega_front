import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TypeAlternativesComponent} from "./type-alternatives.component";
import {TypeAlternativesHomeComponent} from "./containers/type-alternatives-home.component";

const routes: Routes = [{
  path:'',
  component: TypeAlternativesComponent,
  children: [
    {
      path: '',
      component: TypeAlternativesHomeComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeAlternativesRoutingModule { }
