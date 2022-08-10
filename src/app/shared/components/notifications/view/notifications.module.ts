import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import {NebularModule} from "../../../nebular.module";



@NgModule({
  declarations: [
    NotificationsComponent
  ],
  exports:[
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    NebularModule
  ]
})
export class NotificationsModule { }
