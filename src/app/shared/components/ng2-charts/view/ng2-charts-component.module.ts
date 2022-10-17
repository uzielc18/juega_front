import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2ChartsComponentComponent } from './ng2-charts-component.component';
import { Ng2ChartsBartComponent } from './components/ng2-charts-bart/ng2-charts-bart.component';
import {NgChartsModule} from "ng2-charts";
import {NebularModule} from "../../../nebular.module";



@NgModule({
  declarations: [
    Ng2ChartsComponentComponent,
    Ng2ChartsBartComponent
  ],
  exports: [
    Ng2ChartsComponentComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    NebularModule
  ]
})
export class Ng2ChartsComponentModule { }
