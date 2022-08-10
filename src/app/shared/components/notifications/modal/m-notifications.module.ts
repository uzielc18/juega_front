import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MNotificationsComponent } from './m-notifications.component';
import {NotificationsModule} from "../view/notifications.module";
import {NebularModule} from "../../../nebular.module";



@NgModule({
  declarations: [
    MNotificationsComponent
  ],
  exports:[
    MNotificationsComponent
  ],
  imports: [
    CommonModule,
    NotificationsModule,
    NebularModule
  ]
})
export class MNotificationsModule { }
