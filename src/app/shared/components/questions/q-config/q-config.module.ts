import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUniqueOptionComponent } from './c-unique-option/c-unique-option.component';
import { CMultiOptionComponent } from './c-multi-option/c-multi-option.component';
import { CTrueFalseComponent } from './c-true-false/c-true-false.component';
import { CRelationComponent } from './c-relation/c-relation.component';
import { COpenComponent } from './c-open/c-open.component';
import { CClosedComponent } from './c-closed/c-closed.component';
import { NebularModule } from 'src/app/shared/nebular.module';
import { QConfigComponent } from './q-config.component';
import { PrepareFileProModule } from '../../prepare-file-pro/prepare-file-pro.module';

const COMPONENTS: any = [
  QConfigComponent,
  CUniqueOptionComponent,
  CMultiOptionComponent,
  CTrueFalseComponent,
  CRelationComponent,
  COpenComponent,
  CClosedComponent
];
const NG_MODULES: any = [
  NebularModule,
];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ...NG_MODULES,
    PrepareFileProModule
  ],
  exports: [QConfigComponent]
})
export class QConfigModule { }
