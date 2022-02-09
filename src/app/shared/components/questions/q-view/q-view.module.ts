import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VRelationComponent } from './v-relation/v-relation.component';
import { NebularModule } from '../../../nebular.module';



@NgModule({
  declarations: [
    VRelationComponent
  ],
  imports: [
    CommonModule,
    NebularModule
  ],
  exports: [
    VRelationComponent
  ]
})
export class QViewModule { }
