import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationsRoutingModule } from './evaluations-routing.module';
import { EvaluationsComponent } from './evaluations.component';
import { EvaluationsHomeComponent } from './containers/evaluations-home.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NebularModule } from '../../shared/nebular.module';

const COMPONENTS: any = [
  EvaluationsComponent,
  EvaluationsHomeComponent
]

const MODULES: any = [
  NgbPaginationModule
]

const NEBULAR: any = [
  NebularModule
]


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    EvaluationsRoutingModule,
    ...NEBULAR,
    ...MODULES,
  ]
})
export class EvaluationsModule { }
