import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PollRoutingModule } from './poll-routing.module';
import { PollComponent } from './poll.component';
import { PollHomeComponent } from './containers/poll-home.component';
import {NebularModule} from "../../../shared/nebular.module";
import { CreatedPollComponent } from './components/views/created-poll/created-poll.component';
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {TreeviewModule} from "ngx-treeview";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import { TabElectionsPollComponent } from './components/tabs/tab-elections-poll/tab-elections-poll.component';
import { TabPollCampComponent } from './components/tabs/tab-poll-camp/tab-poll-camp.component';


@NgModule({
  declarations: [
    PollComponent,
    PollHomeComponent,
    CreatedPollComponent,
    TabElectionsPollComponent,
    TabPollCampComponent
  ],
  imports: [
    CommonModule,
    PollRoutingModule,
    NebularModule,
    ControlMessagesModule,
    TreeviewModule.forRoot(),
    CKEditorModule
  ]
})
export class PollModule { }
