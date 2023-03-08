import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportErrorsComponent} from "./report-errors.component";
import {ReportErrorsHomeComponent} from "./containers/report-errors-home.component";

const routes: Routes = [
  {
    path: '',
    component: ReportErrorsComponent,
    children: [
      {
        path: '',
        component: ReportErrorsHomeComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportErrorsRoutingModule { }
