import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VListCoursesComponent } from 'src/app/pages/asignatures/components/views/v-list-courses/v-list-courses.component';
import { AsignaturesComponent } from './asignatures.component';
import { VCourseComponent } from './components/views/v-course/v-course.component';
import { VElementsBaseComponent } from './components/views/v-elements/v-elements-base.component';
import { AsignaturesHomeComponent } from './containers/asignatures-home.component';
import {VNotesComponent} from "./components/views/v-notes/v-notes.component";

const routes: Routes = [
  {
    path: '',
    component: AsignaturesComponent,
    children: [
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
        {
          path: 'course/:id_carga_curso_docente/notes',
          component: VNotesComponent
        },
      ]
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignaturesRoutingModule { }
