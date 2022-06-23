import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuUnitTopicElementComponent } from './menu-unit-topic-element.component';
import { NebularModule } from '../../nebular.module';
import { GeneralService } from 'src/app/providers';

const COMPONENTS: any = [
  MenuUnitTopicElementComponent
]
const SERVICES: any = [
  GeneralService
]
const MODULES: any = [
]
const NEBULAR: any = [
  NebularModule
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ...NEBULAR
  ],
  exports: [...COMPONENTS],
  providers: [...SERVICES]
})
export class MenuUnitTopicElementModule { }
