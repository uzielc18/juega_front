import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VDocMultiOptionComponent } from './v-docente/v-doc-multi-option/v-doc-multi-option.component';
import { VDocUniqueOptionComponent } from './v-docente/v-doc-unique-option/v-doc-unique-option.component';
import { QViewComponent } from './q-view.component';
import { VRelationComponent } from './v-relation/v-relation.component';
import { NebularModule } from '../../../nebular.module';
import { VDocTrueFalseComponent } from './v-docente/v-doc-true-false/v-doc-true-false.component';
import { VDocClosedComponent } from './v-docente/v-doc-closed/v-doc-closed.component';
import { VDocOpenComponent } from './v-docente/v-doc-open/v-doc-open.component';

const COMPONENTS: any = [
  VRelationComponent,
  QViewComponent,
  VDocMultiOptionComponent,
  VDocUniqueOptionComponent,
  VDocTrueFalseComponent,
  VDocClosedComponent,
  VDocOpenComponent
];

const NEBULAR: any = [
  NebularModule
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    NEBULAR,
    CommonModule,
  ],
  exports: [...COMPONENTS]
})
export class QViewModule { }
