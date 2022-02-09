import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VDocMultiOptionComponent } from './v-docente/v-doc-multi-option/v-doc-multi-option.component';
import { VDocUniqueOptionComponent } from './v-docente/v-doc-unique-option/v-doc-unique-option.component';
import { QViewComponent } from './q-view.component';

const COMPONENTS: any = [
  QViewComponent,
  VDocMultiOptionComponent,
  VDocUniqueOptionComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule
  ], 
  exports: [...COMPONENTS]
})
export class QViewModule { }
