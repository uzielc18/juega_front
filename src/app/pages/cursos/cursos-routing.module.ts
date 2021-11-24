import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosComponent } from './contents/cursos/cursos.component';
import { CursoComponent } from './contents/curso/curso.component';
import { MainComponent } from './contents/main/main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: CursosComponent,
        data: { breadcrumb: 'Asignaturas' },
      },
      {
        path: ':course',
        component: CursoComponent,
        data: { breadcrumb: 'Capacidades Comunicativas I' },
      },
      {
        path: '**',
        redirectTo: ''
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosRoutingModule {}
