import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import {NebularModule} from "../../../nebular.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    NotificationsComponent
  ],
  exports:[
    NotificationsComponent
  ],
    imports: [
        CommonModule,
        NebularModule,
        RouterModule
    ]
})
export class NotificationsModule { }
