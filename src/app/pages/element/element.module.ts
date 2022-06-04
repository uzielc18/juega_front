import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementRoutingModule } from './element-routing.module';
import { ElementComponent } from './element.component';
import { NebularModule } from '../../shared/nebular.module';
import { ElementHomeComponent } from './containers/element-home.component';
import { FilterModule } from '../../shared/pipes/filter/filter.module';
import { DirectiveModule } from '../../shared/directives/highlight.module';
import { ElementsFormHomeComponent } from './components/elements-form-home/elements-form-home.component';
import { MenuElementsModule } from '../../shared/components/menu-elements/menu-elements.module';
import { ControlMessagesModule } from '../../shared/components/control-messages/control-messages.module';
import { PrepareFileProModule } from '../../shared/components/prepare-file-pro/prepare-file-pro.module';
import { MoreOptionsModule } from '../../shared/components/more-options/more-options.module';
import { AsignaturesModule } from '../asignatures/asignatures.module';

const COMPONENTS: any[] = [
  ElementComponent,
  ElementHomeComponent,
  ElementsFormHomeComponent
];

const NG_MODULES: any = [
  NebularModule,
];

const MODULES: any = [
  MenuElementsModule,
  PrepareFileProModule,
  MoreOptionsModule,
  AsignaturesModule
]

const CONTROL_MESSAGGE: any = [
  ControlMessagesModule,
];

const PIPES: any = [
  FilterModule
];
const DIRECTIVES: any = [
  DirectiveModule
]
@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    ...NG_MODULES,
    ...MODULES,
    ...CONTROL_MESSAGGE,
    ...PIPES,
    ...DIRECTIVES,
    CommonModule,
    ElementRoutingModule
  ]
})
export class ElementModule { }
