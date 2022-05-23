import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RubricsRoutingModule } from './rubrics-routing.module';
import { RubricsComponent } from './rubrics.component';
import { RubricsHomeComponent } from './containers/rubrics-home.component';
import { NebularModule } from '../../shared/nebular.module';
import { CreateRubricComponent } from './components/create-rubric/create-rubric.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const COMPONENTS: any = [
  RubricsComponent,
  RubricsHomeComponent,
  CreateRubricComponent
]

const MODULES: any = [
  NgbPaginationModule
]

const NEBULAR: any = [
  NebularModule
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    RubricsRoutingModule,
    ...MODULES,
    ...NEBULAR
  ]
})


export class RubricsModule { }
