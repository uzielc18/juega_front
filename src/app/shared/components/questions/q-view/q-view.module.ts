import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VDocMultiOptionComponent } from './v-docente/v-doc-multi-option/v-doc-multi-option.component';
import { VDocUniqueOptionComponent } from './v-docente/v-doc-unique-option/v-doc-unique-option.component';
import { QViewComponent } from './q-view.component';
import { NebularModule } from '../../../nebular.module';
import { VDocRelationComponent } from './v-docente/v-doc-relation/v-doc-relation.component';

const COMPONENTS: any = [
  QViewComponent,
  VDocMultiOptionComponent,
  VDocUniqueOptionComponent,
  VDocRelationComponent
];

const NEBULAR: any = [
  NebularModule
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    NEBULAR,
    CommonModule
  ],
  exports: [...COMPONENTS]
})
export class QViewModule { }
