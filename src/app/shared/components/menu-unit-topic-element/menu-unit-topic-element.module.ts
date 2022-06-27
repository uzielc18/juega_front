import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuUnitTopicElementComponent } from './menu-unit-topic-element.component';
import { NebularModule } from '../../nebular.module';
import { GeneralService } from 'src/app/providers';
import { MenuElementsChildModule } from '../menu-elements-child/menu-elements-child.module';

const COMPONENTS: any = [
  MenuUnitTopicElementComponent
]
const SERVICES: any = [
  GeneralService
]
const MODULES: any = [
  MenuElementsChildModule
]
const NEBULAR: any = [
  NebularModule
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ...NEBULAR,
    ...MODULES
  ],
  exports: [...COMPONENTS],
  providers: [...SERVICES]
})
export class MenuUnitTopicElementModule { }
