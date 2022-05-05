import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RubricsHomeComponent } from './containers/rubrics-home.component';
import { RubricsComponent } from './rubrics.component';

const routes: Routes = [
  {
    path: '',
    component: RubricsComponent,
    children: [
      {
        path: '',
        component: RubricsHomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RubricsRoutingModule { }
