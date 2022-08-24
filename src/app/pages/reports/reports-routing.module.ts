import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportsComponent} from "./reports.component";

const routes: Routes = [{
  path: '',
  component: ReportsComponent,
  children: [
    {
      path:'report-course',
      loadChildren: () => import('src/app/pages/reports/report-course/report-course.module').then(m => m.ReportCourseModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
