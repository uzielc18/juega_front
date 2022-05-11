import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CalendarEvent } from 'angular-calendar';
import { AppService } from 'src/app/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { MDetailsCalendarComponent } from '../components/modals/m-details-calendar/m-details-calendar.component';
import { MEventGoogleCalendarComponent } from '../components/modals/m-event-google-calendar/m-event-google-calendar.component';

@Component({
  selector: 'app-my-calendar-home',
  templateUrl: './my-calendar-home.component.html',
  styleUrls: ['./my-calendar-home.component.scss']
})
export class MyCalendarHomeComponent implements OnInit {
  loading: boolean = false;
  date: Date = new Date();
  typeCalendario = 'month';
  infoCalendars:any = [];
  events: CalendarEvent[] = [];
  valueCalendar:any = [];
  constructor(private userService: AppService, private service: GeneralService, public datepipe: DatePipe,
    private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.getTypeCalendars();
  }
  handleDateChange($event:Date) {
    this.date = $event;
    this.getTypeCalendars();
  }
  getTypeCalendars() {
    const serviceName = END_POINTS.base_back.calendar + '/mis-calendarios';
    if (this.userService.user.id) {
      const params:any = {
        fecha: this.datepipe.transform(this.date, 'yyyy-MM-dd'),
        calendar: this.typeCalendario === 'month' ? 'mes' : this.typeCalendario === 'week' ? 'semana' : this.typeCalendario === 'day' ? 'dia' : '',
      }
      this.loading = true;
        this.service.nameIdParams$(serviceName, this.userService.user.id, params).subscribe((res:any) => {
          this.infoCalendars = res.data  || [];
          if (this.infoCalendars.length>0) {
                const array:any = [];
                this.infoCalendars.forEach((element:any) => {
                if (element.calendario.length>0) {
                  element.calendario.map((a:any)=> {
                    if (a.checked === 1) {
                      a.checked = true;
                      array.push(a.codigo);
                    } else {
                      a.checked = false;
                    }
                  });
                }
              });
              const value = array.join(',');
              setTimeout(() => {
                this.getMyEvents(value);
                
              }, 1000);
          }
        }, () => { this.loading = false; }, () => { this.loading = false; });
    }
  }
  monthWeekDay($event:any) {
    this.typeCalendario = $event;
    // this.getTypeCalendars();
  }
  typeElementCal($event:boolean, item:any) {
    item.checked = $event;
    let codigos = '';
    setTimeout(() => {
      codigos = this.reccore(); 
      this.getMyEvents(codigos);
    }, 100);

    
  }
  reccore() {
    const array:any = [];
    this.infoCalendars.forEach((element:any) => {
      if (element.calendario.length>0) {
        element.calendario.map((a:any)=> {
          if (a.checked) {
            array.push(a.codigo);
          }
        });
      }
    });
    const value = array.join(',');
    return value;
  }
  getMyEvents(codigos:any) {
    const serviceName = END_POINTS.base_back.calendar + '/mis-eventos';
    if (this.userService.user.id) {
      const params:any = {
        fecha: this.datepipe.transform(this.date, 'yyyy-MM-dd'),
        calendar: this.typeCalendario === 'month' ? 'mes' : this.typeCalendario === 'week' ? 'semana' : this.typeCalendario === 'day' ? 'dia' : '',
        type: codigos || '',
      }
      this.loading = true;
        this.service.nameIdParams$(serviceName, this.userService.user.id, params).subscribe((res:any) => {
          this.valueCalendar = res.data  || [];
          if (this.valueCalendar.length>0) {
                const newArray:any = [];
                this.valueCalendar.forEach((value:any) => {
                const structure:any = {
                  start: new Date(value.start),
                  // end: new Date(value.end) || '',
                  id: value.id,
                  title: value.title,
                  color: {
                    primary: value.color_primary,
                    secondary: '#FAE3E3',
                  },
                  // actions: this.actions,
                  // allDay: true,
                  resizable: {
                    beforeStart: true,
                    afterEnd: true,
                  },
                  draggable: false,
                }
                if (value && value.end) {
                  structure.end = new Date(value.end);
                }
                newArray.push(structure);
                
              });
              // setTimeout(() => {
                this.events = newArray;
          }
        }, () => { this.loading = false; }, () => { this.loading = false; });
    }
  }
  selectedEvent($event:any) {
    const values = this.valueCalendar.find((a:any) => a.id === $event.id);
    if (values) {
      this.dialogService.open(MDetailsCalendarComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          datos: values
          // response: params,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false
      }).onClose.subscribe(result => {
        if (result === 'ok') {
          // this.filtrar();
        }
      });
    }
    
  }
  changeDate($event:any) {
    if ($event) {
      this.date = $event;
      setTimeout(() => {
        this.getTypeCalendars();
      }, 100);
    }
  }
  googleEvents() {
      this.dialogService.open(MEventGoogleCalendarComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          // datos: values
          // response: params,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false
      }).onClose.subscribe(result => {
        if (result === 'ok') {
          // this.filtrar();
        }
      });
    
  }
}
