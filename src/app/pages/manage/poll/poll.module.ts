import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PollRoutingModule } from './poll-routing.module';
import { PollComponent } from './poll.component';
import { PollHomeComponent } from './containers/poll-home.component';
import {NebularModule} from "../../../shared/nebular.module";
import { CreatedPollComponent } from './components/views/created-poll/created-poll.component';
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {TreeviewModule} from "ngx-treeview";


@NgModule({
  declarations: [
    PollComponent,
    PollHomeComponent,
    CreatedPollComponent
  ],
  imports: [
    CommonModule,
    PollRoutingModule,
    NebularModule,
    ControlMessagesModule,
    TreeviewModule.forRoot(),
  ]
})
export class PollModule { }
