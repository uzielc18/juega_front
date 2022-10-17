import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportElectionComponent} from "./report-election.component";
import {ReportElectionHomeComponent} from "./containers/report-election-home.component";

const routes: Routes = [
  {
    path: '',
    component: ReportElectionComponent,
    children: [
      {
        path: '',
        component: ReportElectionHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportElectionRoutingModule { }
