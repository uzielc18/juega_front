import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RubricasComponent } from './rubricas.component';
import { GeneralService } from 'src/app/providers';

@NgModule({
  declarations: [RubricasComponent],
  imports: [CommonModule],
  exports: [RubricasComponent],
  providers: [GeneralService]
})
export class RubricasModule { }
