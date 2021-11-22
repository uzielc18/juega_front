import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NebularModule } from '../../shared/nebular.module';
import { DashboardComponent } from './dashboard.component';
import { CursosModule } from '../cursos/cursos.module';
import { RouterModule } from '@angular/router';
import { CursoComponent } from '../cursos/contents/curso/curso.component';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    NebularModule,
    CursosModule
  ]
})
export class DashboardModule { }
