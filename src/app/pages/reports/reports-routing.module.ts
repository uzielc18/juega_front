import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportsComponent} from "./reports.component";

const routes: Routes = [{
  path: '',
  component: ReportsComponent,
  children: [
    {
      path:'report-errors',
      loadChildren: () => import('src/app/pages/reports/report-errors/report-errors.module').then(m => m.ReportErrorsModule)
    },{
      path:'report-course',
      loadChildren: () => import('src/app/pages/reports/report-course/report-course.module').then(m => m.ReportCourseModule)
    },
    {
      path:'report-access',
      loadChildren: () => import('src/app/pages/reports/report-access/report-access.module').then(m => m.ReportAccessModule)
    },
    {
      path:'report-election',
      loadChildren: () => import('src/app/pages/reports/report-election/report-election.module').then(m => m.ReportElectionModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
