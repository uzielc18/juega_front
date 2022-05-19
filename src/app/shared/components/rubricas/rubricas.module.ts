import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RubricasComponent } from './rubricas.component';
import { GeneralService } from 'src/app/providers';
import { NebularModule } from '../../nebular.module';

@NgModule({
  declarations: [RubricasComponent],
  imports: [CommonModule, NebularModule],
  exports: [RubricasComponent],
  providers: [GeneralService]
})
export class RubricasModule { }
