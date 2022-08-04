import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MSatisfactionComponent } from './m-satisfaction.component';
import {NebularModule} from "../../../nebular.module";
import {SatisfactionModule} from "../view/satisfaction.module";



@NgModule({
  declarations: [
    MSatisfactionComponent
  ],
    imports: [
        CommonModule,
        NebularModule,
        SatisfactionModule
    ]
})
export class MSatisfactionModule { }
