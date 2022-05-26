import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementRoutingModule } from './element-routing.module';
import { ElementComponent } from './element.component';
import { NebularModule } from '../../shared/nebular.module';
import { ElementHomeComponent } from './containers/element-home.component';

const COMPONENTS: any[] = [
  ElementComponent,
  ElementHomeComponent
];

const NG_MODULES: any = [
  NebularModule,
];

const MODULES: any = [

]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...NG_MODULES,
    ...MODULES,
    CommonModule,
    ElementRoutingModule
  ]
})
export class ElementModule { }
