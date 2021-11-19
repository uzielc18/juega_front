import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NebularModule } from '../../shared/nebular.module';
import { BreadcrumbModule } from 'xng-breadcrumb';

import { MainComponent } from './contents/main/main.component';
import { ChildrenComponent } from './components/children/children.component';
import { InfoComponent } from './components/info/info.component';
import { CursoComponent } from './contents/curso/curso.component';
import { UnidadComponent } from './components/unidad/unidad.component';
import { SesionComponent } from './components/sesion/sesion.component';
import { CursosComponent } from './contents/cursos/cursos.component';
import { HomeworkFormComponent } from './components/homework-form/homework-form.component';
import { CursoCardComponent } from './components/curso-card/curso-card.component';

@NgModule({
  declarations: [
    MainComponent,
    ChildrenComponent,
    InfoComponent,
    CursoComponent,
    UnidadComponent,
    SesionComponent,
    CursosComponent,
    HomeworkFormComponent,
    CursoCardComponent,
  ],
  exports: [
    CursosComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CursosComponent,
      },
      {
        path: '',
        component: CursoComponent,
        children: [
          {
            path: 'course',
            data: { breadcrumb: 'Capacidades Comunicativas I' },
          },
        ],
      },
      {
        path: '',
        component: MainComponent,
        children: [
          {
            path: 'children',
            component: ChildrenComponent,
          },
        ],
      },
    ]),
    NebularModule,
    BreadcrumbModule,
  ],
})
export class CursosModule {}
