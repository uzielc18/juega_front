import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElementRoutingModule } from './element-routing.module';
import { ElementComponent } from './element.component';
import { ElementHomeComponent } from './containers/element-home.component';
import { NebularModule } from 'src/app/shared/nebular.module';
import { MenuElementsModule } from 'src/app/shared/components/menu-elements/menu-elements.module';
import { PrepareFileProModule } from 'src/app/shared/components/prepare-file-pro/prepare-file-pro.module';
import { MoreOptionsModule } from 'src/app/shared/components/more-options/more-options.module';
// import { AsignaturesModule } from '../../asignatures/asignatures.module';
import { ControlMessagesModule } from 'src/app/shared/components/control-messages/control-messages.module';
import { FilterModule } from 'src/app/shared/pipes/filter/filter.module';
import { DirectiveModule } from 'src/app/shared/directives/highlight.module';
import { ElementsFormHomeComponent } from './components/elements-form-home/elements-form-home.component';
import {AsignaturesModule} from "../../asignatures/asignatures.module";
import {EvaluationsModule} from "../../evaluations/evaluations.module";


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
  // AsignaturesModule
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
  declarations: [...COMPONENTS],
    imports: [
        ...NG_MODULES,
        ...MODULES,
        ...CONTROL_MESSAGGE,
        ...PIPES,
        ...DIRECTIVES,
        CommonModule,
        ElementRoutingModule,
        AsignaturesModule,
    ]
})
export class ElementModule { }
