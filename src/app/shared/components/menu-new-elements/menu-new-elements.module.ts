import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuNewElementsComponent } from './menu-new-elements.component';
import {NebularModule} from "../../nebular.module";



@NgModule({
  declarations: [
    MenuNewElementsComponent
  ],
  imports: [
    CommonModule,
    NebularModule
  ],
  exports: [
    MenuNewElementsComponent
  ]
})
export class MenuNewElementsModule { }
