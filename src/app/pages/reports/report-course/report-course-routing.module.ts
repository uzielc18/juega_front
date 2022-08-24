import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportCourseComponent} from "./report-course.component";
import {ReportCourseHomeComponent} from "./containers/report-course-home.component";

const routes: Routes = [
  {
    path: '',
    component: ReportCourseComponent,
    children: [
      {
        path: '',
        component: ReportCourseHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportCourseRoutingModule { }
