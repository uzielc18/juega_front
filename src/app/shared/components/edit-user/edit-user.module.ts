import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from './edit-user.component';
import { GeneralService } from '../../../providers';
import { NebularModule } from '../../nebular.module';
import { EditAreaRolComponent } from './edit-area-rol/edit-area-rol.component';

@NgModule({
  declarations: [EditUserComponent, EditAreaRolComponent],
  imports: [CommonModule, NebularModule],
  exports: [EditUserComponent],
  providers: [GeneralService]
})
export class EditUserModule {}
