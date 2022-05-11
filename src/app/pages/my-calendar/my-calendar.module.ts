import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCalendarComponent } from './my-calendar.component';
import { NebularModule } from 'src/app/shared/nebular.module';
import { MyCalendarHomeComponent } from './containers/my-calendar-home.component';
import { MyCalendarRoutingModule } from './my-calendar-routing.module';
import { CalendarViewModule } from 'src/app/shared/components/calendar-viewer/calendar/calendar-view.module';
import { NbCalendarModule } from '@nebular/theme';
import { MDetailsCalendarComponent } from './components/modals/m-details-calendar/m-details-calendar.component';
import { MEventGoogleCalendarComponent } from './components/modals/m-event-google-calendar/m-event-google-calendar.component';
const COMPONENTS: any = [
  MyCalendarComponent,
  MyCalendarHomeComponent,
  MDetailsCalendarComponent,
  MEventGoogleCalendarComponent
]
const MODALS: any = [
  MDetailsCalendarComponent,
  MEventGoogleCalendarComponent
]
const MODULES: any = [
  CalendarViewModule
]

const NEBULAR: any = [
  NebularModule,
  NbCalendarModule
]

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    MyCalendarRoutingModule,
    ...MODULES,
    ...NEBULAR,
   
  ],
  entryComponents: [...MODALS],
  exports: []
})

export class MyCalendarModule { }