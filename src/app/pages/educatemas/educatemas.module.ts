import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducatemasRoutingModule} from './educatemas-routing.module';
import { EducatemasComponent } from './educatemas.component';


@NgModule({
  declarations: [
    EducatemasComponent,
  ],
  imports: [
    CommonModule,
    EducatemasRoutingModule
  ]
})
export class EducatemasModule { }
