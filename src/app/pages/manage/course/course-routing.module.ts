import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseHomeComponent } from './containers/course-home.component';
import { CourseComponent } from './course.component';

const routes: Routes = [
  {
    path: '',
    component: CourseComponent,
    children: [
      {
        path: '',
        component: CourseHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
