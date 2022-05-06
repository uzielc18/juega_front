import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar-view.component';
import { NebularModule } from 'src/app/shared/nebular.module';
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import { CalendarModule, DateAdapter } from 'angular-calendar';
const COMPONENTS: any = [
  CalendarComponent
]
const MODALS: any = [
]
const MODULES: any = [
  // VideoPlayerModule
]

const NEBULAR: any = [
  NebularModule
]

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    ...MODULES,
    ...NEBULAR,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  entryComponents: [...MODALS],
  exports: [CalendarComponent]
})

export class CalendarViewModule { }
