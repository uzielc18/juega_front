import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NebularModule } from '../../shared/nebular.module';
import { DashboardComponent } from './dashboard.component';
import { CursosModule } from '../cursos/cursos.module';
import { RouterModule } from '@angular/router';



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
      }
    ]),
    NebularModule,
    CursosModule
  ]
})
export class DashboardModule { }
