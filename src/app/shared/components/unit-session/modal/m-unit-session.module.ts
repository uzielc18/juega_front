import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UnitSessionModule} from "../view/unit-session.module";
import {MUnitSessionComponent} from "./m-unit-session.component";
import {NebularModule} from "../../../nebular.module";



@NgModule({
  declarations: [    MUnitSessionComponent
  ],
  imports: [
    CommonModule,
    UnitSessionModule,
    NebularModule
  ],
  exports: [
    MUnitSessionComponent
  ]
})
export class MUnitSessionModule { }
