import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCalendarHomeComponent } from './containers/my-calendar-home.component';
import { MyCalendarComponent } from './my-calendar.component';

const routes: Routes = [
  {
    path: '',
    component: MyCalendarComponent,
    children: [
      {
        path: '',
        component: MyCalendarHomeComponent,
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCalendarRoutingModule { }
