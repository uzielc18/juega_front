import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from './edit-user.component';
import { GeneralService } from '../../../providers';
import { NebularModule } from '../../nebular.module';
import { PerfilComponent } from './perfil/perfil.component';
import { RolComponent } from './rol/rol.component';
import { CursoComponent } from './curso/curso.component';
import { EditAreaRolComponent } from './rol/edit-area-rol/edit-area-rol.component';

@NgModule({
  declarations: [EditUserComponent, EditAreaRolComponent, PerfilComponent, RolComponent, CursoComponent],
  imports: [CommonModule, NebularModule],
  exports: [EditUserComponent],
  providers: [GeneralService]
})
export class EditUserModule {}
