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
      },
      {
        path: ':curso',
        component: CursoComponent,
        data: { breadcrumb: 'Capacidades Comunicativas I' },
        children: [
          {
            path: ':unidad',
            component: UnidadComponent,
            data: { breadcrumb: 'I Primer titulo de la unidad' },
            children: [
              {
                path: ':sesion',
                component: SesionComponent,
                data: { breadcrumb: 'Esto es un tema de la sesion' },
                children: [
                  {
                    path: 'trabajo',
                    component: TrabajoComponent,
                    data: { breadcrumb: 'Trabajo 01' },
                  },
                  {
                    path: 'video',
                    component: VideoConferenciaComponent,
                    data: { breadcrumb: 'Video Conferencia 01' },
                  },
                ],
              },
            ],
          },
        ],
      },
      // {
      //   path: ':curso/:unidad',
      //   component: UnidadComponent,
      //   data: { breadcrumb: 'I Primer titulo de la unidad' },
      // },
      // {
      //   path: ':curso/:unidad/:sesion',
      //   component: SesionComponent,
      //   data: { breadcrumb: 'Esto es un tema de la sesion' },
      // },
      // {
      //   path: ':curso/:unidad/:sesion/trabajo',
      //   component: TrabajoComponent,
      //   data: { breadcrumb: 'Trabajo 01' },
      // },
      // {
      //   path: ':curso/:unidad/:sesion/video',
      //   component: TrabajoComponent,
      //   data: { breadcrumb: 'Video Conferencia 01' },
      // },
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
