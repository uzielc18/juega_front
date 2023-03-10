import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpeuJuegaRoutingModule} from './upeu-juega-routing.module';
import { UpeuJuegaComponent } from './upeu-juega.component';


@NgModule({
  declarations: [
    UpeuJuegaComponent,
  ],
  imports: [
    CommonModule,
    UpeuJuegaRoutingModule
  ]
})
export class UpeuJuegaModule { }
