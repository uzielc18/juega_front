import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementRoutingModule } from './element-routing.module';
import { ElementComponent } from './element.component';
import { NebularModule } from '../../shared/nebular.module';
import { ElementHomeComponent } from './containers/element-home.component';
import { FilterModule } from '../../shared/pipes/filter/filter.module';
import { DirectiveModule } from '../../shared/directives/highlight.module';

const COMPONENTS: any[] = [
  ElementComponent,
  ElementHomeComponent
];

const NG_MODULES: any = [
  NebularModule,
];

const MODULES: any = [

]

const PIPES: any = [
  FilterModule
];
const DIRECTIVES: any = [
  DirectiveModule
]
@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...NG_MODULES,
    ...MODULES,
    ...PIPES,
    ...DIRECTIVES,
    CommonModule,
    ElementRoutingModule
  ]
})
export class ElementModule { }
