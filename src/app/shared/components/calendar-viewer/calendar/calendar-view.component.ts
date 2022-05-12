import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  @Input() currentYear: number = 0;

  refresh: Subject<any> = new Subject();

  // @Input() events: CalendarEvent[] = [];
  @Input() events: CalendarEvent[] = [];
  @Input() useDefaultViewer: boolean = true;
  @Output() eventSelected = new EventEmitter<any>();
  @Output() typeMonthWeekDay = new EventEmitter<any>();
  @Output() dateChange = new EventEmitter<any>();
  activeDayIsOpen: boolean = false;
  @Input() newDate: Date = new Date();
  constructor(private dialogService: NbDialogService) {
  }
  ngOnInit(): void {
    // this.viewDate.setFullYear(this.currentYear);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.viewDate = this.newDate;
    this.events = this.events;
    if (this.events.length<=0) {
      this.activeDayIsOpen = false;
    }
    // this.events = this.events;
    // if (changes && changes.hasOwnProperty('events') && changes.events.currentValue && changes.events.previousValue &&
    //  (changes.events.currentValue.length !== changes.events.previousValue.length)) {
    //    console.log('holas padreeeeeeeee');
       
    //   setTimeout(() => {
    //     let nNow = new Date();
    //     nNow.setFullYear(this.currentYear);
    //     this.viewDate = nNow;
    //   }, 100)
    // }
  }
  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.onEventSelected(event)
  }


  setView(view: CalendarView) {
    this.view = view;
    this.typeMonthWeekDay.emit(view);
    this.events = [];
    this.dateChange.emit(this.viewDate);
  }

  closeOpenMonthViewDay($event:any) {
    this.activeDayIsOpen = false;
    this.events = [];
    this.dateChange.emit($event);
  }

  onEventSelected(event: any) {
    this.eventSelected.emit(event);
    // if (this.useDefaultViewer) {
    //   this.eventSelected.emit(event);
    //   this.dialogService.open(EvaluationActivitiesViewerComponent, {
    //     context: {
    //       event: event.value,
    //       color: event.color.primary
    //     },
    //   })
    // } else {
    //   this.eventSelected.emit(event);
    // }

  }
}
