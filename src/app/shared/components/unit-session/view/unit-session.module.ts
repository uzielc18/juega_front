import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitSessionComponent } from './unit-session.component';
import {DragDropModule} from "@angular/cdk/drag-drop";

import { MUnitComponent } from './components/modals/m-unit/m-unit.component';
import { MSessionComponent } from './components/modals/m-session/m-session.component';
import {NebularModule} from "../../../nebular.module";


@NgModule({
  declarations: [
    UnitSessionComponent,
    MUnitComponent,
    MSessionComponent
  ],
  exports:[
    UnitSessionComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    NebularModule
  ]
})
export class UnitSessionModule { }
