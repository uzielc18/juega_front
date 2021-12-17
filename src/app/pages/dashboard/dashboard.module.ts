import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NebularModule } from '../../shared/nebular.module';
import { DashboardComponent } from './dashboard.component';
import { CursosModule } from '../cursos/cursos.module';
import { PerfilComponent } from './components/perfil/perfil.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    NebularModule,
    CursosModule
  ]
})
export class DashboardModule { }
