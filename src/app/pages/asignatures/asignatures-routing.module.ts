import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VListCoursesComponent } from 'src/app/pages/asignatures/components/views/v-list-courses/v-list-courses.component';
import { VCourseComponent } from './components/views/v-course/v-course.component';
import { VDocumentComponent } from './components/views/v-elements/v-document/v-document.component';
import { VEvaluationComponent } from './components/views/v-elements/v-evaluation/v-evaluation.component';
import { VFolderComponent } from './components/views/v-elements/v-folder/v-folder.component';
import { VForumComponent } from './components/views/v-elements/v-forum/v-forum.component';
import { VLinkComponent } from './components/views/v-elements/v-link/v-link.component';
import { VRecordedClassComponent } from './components/views/v-elements/v-recorded-class/v-recorded-class.component';
import { VVideoConferenceComponent } from './components/views/v-elements/v-video-conference/v-video-conference.component';
import { VVideoComponent } from './components/views/v-elements/v-video/v-video.component';
import { VWorksComponent } from './components/views/v-elements/v-works/v-works.component';
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
        path: 'course/:id_carga_curso_docente/documento/:id',
        component: VDocumentComponent
      },
      {
        path: 'course/:id_carga_curso_docente/evaluacion/:id',
        component: VEvaluationComponent
      },
      {
        path: 'course/:id_carga_curso_docente/carpeta/:id',
        component: VFolderComponent
      },
      {
        path: 'course/:id_carga_curso_docente/foro/:id',
        component: VForumComponent
      },
      {
        path: 'course/:id_carga_curso_docente/enlace/:id',
        component: VLinkComponent
      },
      {
        path: 'course/:id_carga_curso_docente/clase_grabada/:id',
        component: VRecordedClassComponent
      },
      {
        path: 'course/:id_carga_curso_docente/video/:id',
        component: VVideoComponent
      },
      {
        path: 'course/:id_carga_curso_docente/video_conferencia/:id',
        component: VVideoConferenceComponent
      },
      {
        path: 'course/:id_carga_curso_docente/trabajo/:id',
        component: VWorksComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignaturesRoutingModule { }
