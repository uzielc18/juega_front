import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EducatemasComponent} from "./educatemas.component";

const routes: Routes = [{
  path: '',
  component: EducatemasComponent,
  children: [
    {
      path:'pagos',
      loadChildren: () => import('src/app/pages/educatemas/pagos/pagos.module').then(m => m.PagosModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducatemasRoutingModule { }
