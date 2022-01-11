import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosComponent } from './contents/cursos/cursos.component';
import { CursoComponent } from './contents/curso/curso.component';
import { MainComponent } from './contents/main/main.component';
import { UnidadComponent } from './components/unidad/unidad.component';
import { SesionComponent } from './components/sesion/sesion.component';
import { TrabajoComponent } from './contents/trabajo/trabajo.component';
import { VideoConferenciaComponent } from './contents/video-conferencia/video-conferencia.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: CursosComponent,
        data: {
          title: 'cursos',
          breadcrumb: [
            {
              label: 'Asignaturas',
              url: '',
            },
          ],
        },
      },
      {
        path: ':curso',
        component: CursoComponent,
        data: {
          title: 'curso',
          breadcrumb: [
            {
              label: 'Asignaturas',
              url: '/pages/asignaturas',
            },
            {
              // label: 'Capacidades Comunicativas I',
              label: '{{curso}}',
              url: '',
            },
          ],
        },
      },
      {
        path: ':curso/:unidad',
        component: CursoComponent,
        data: {
          title: 'unidad',
          breadcrumb: [
            {
              label: 'Asignaturas',
              url: '/pages/asignaturas',
            },
            {
              label: 'Capacidades Comunicativas I',
              url: '/pages/asignaturas/:curso',
            },
            {
              label: 'I Primer titulo de la unidad',
              url: '',
            },
          ],
        },
      },
      {
        path: ':curso/:unidad/:sesion',
        component: CursoComponent,
        data: {
          title: 'sesion',
          breadcrumb: [
            {
              label: 'Asignaturas',
              url: '/pages/asignaturas',
            },
            {
              label: 'Capacidades Comunicativas I',
              url: '/pages/asignaturas/:curso',
            },
            {
              label: 'I Primer titulo de la unidad',
              url: '/pages/asignaturas/:curso/:unidad',
            },
            {
              label: 'Esto es un tema de la sesion',
              url: '',
            },
          ],
        },
      },
      {
        path: ':curso/:unidad/:sesion/trabajo',
        component: TrabajoComponent,
        data: {
          title: 'trabajo',
          breadcrumb: [
            {
              label: 'Asignaturas',
              url: '/pages/asignaturas',
            },
            {
              label: 'Capacidades Comunicativas I',
              url: '/pages/asignaturas/:curso',
            },
            {
              label: 'I Primer titulo de la unidad',
              url: '/pages/asignaturas/:curso/:unidad',
            },
            {
              label: 'Esto es un tema de la sesion',
              url: '/pages/asignaturas/:curso/:unidad/:sesion',
            },
            {
              label: 'Trabajo 01',
              url: '',
            },
          ],
        },
      },
      {
        path: ':curso/:unidad/:sesion/video',
        component: VideoConferenciaComponent,
        data: {
          title: 'video',
          breadcrumb: [
            {
              label: 'Asignaturas',
              url: '/pages/asignaturas',
            },
            {
              label: 'Capacidades Comunicativas I',
              url: '/pages/asignaturas/:curso',
            },
            {
              label: 'I Primer titulo de la unidad',
              url: '/pages/asignaturas/:curso/:unidad',
            },
            {
              label: 'Esto es un tema de la sesion',
              url: '/pages/asignaturas/:curso/:unidad/:sesion',
            },
            {
              label: 'Video Conferencia 01',
              url: '',
            },
          ],
        },
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosRoutingModule {}
