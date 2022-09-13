import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PollComponent} from "./poll.component";
import {PollHomeComponent} from "./containers/poll-home.component";
import {CreatedPollComponent} from "./components/views/created-poll/created-poll.component";

const routes: Routes = [
  {
    path: '',
    component: PollComponent,
    children: [
      {
        path: '',
        component: PollHomeComponent,
      },
      {
        path: 'created',
        component: CreatedPollComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollRoutingModule { }
