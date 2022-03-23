import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RubricsRoutingModule } from './rubrics-routing.module';
import { RubricsComponent } from './rubrics.component';
import { RubricsHomeComponent } from './containers/rubrics-home.component';
import { NebularModule } from '../../shared/nebular.module';

const COMPONENTS: any = [
  RubricsComponent,
  RubricsHomeComponent
]

const MODULES: any = [

]

const NEBULAR: any = [
  NebularModule
]

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    RubricsRoutingModule,
    ...MODULES,
    ...NEBULAR
  ]
})


export class RubricsModule { }
