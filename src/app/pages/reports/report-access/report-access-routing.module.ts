import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportAccessComponent} from "./report-access.component";
import {ReportAccessHomeComponent} from "./containers/report-access-home.component";

const routes: Routes = [
  {
    path: '',
    component: ReportAccessComponent,
    children: [
      {
        path: '',
        component: ReportAccessHomeComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportAccessRoutingModule { }
