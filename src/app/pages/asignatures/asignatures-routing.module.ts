import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VListCoursesComponent } from 'src/app/pages/asignatures/components/views/v-list-courses/v-list-courses.component';
import { VCourseComponent } from './components/views/v-course/v-course.component';
import { VElementsBaseComponent } from './components/views/v-elements/v-elements-base.component';
import { AsignaturesHomeComponent } from './containers/asignatures-home.component';

const routes: Routes = [
  {
    path: '',
    component: AsignaturesHomeComponent,
    children: [
      {
        path: '',
        component: VListCoursesComponent,
      },
      {
        path: 'course/:id_carga_curso_docente',
        component: VCourseComponent
      },
      {
        path: 'course/:id_carga_curso_docente/element/:id',
        component: VElementsBaseComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignaturesRoutingModule { }
