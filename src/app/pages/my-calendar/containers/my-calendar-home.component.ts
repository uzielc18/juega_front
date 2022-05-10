import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addDays, addHours, endOfMonth, startOfDay, subDays } from 'date-fns';
import { AppService } from 'src/app/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

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
    // {
    //   start: new Date('2022-05-09 10:00:00'),
    //   // end: new Date('2022-05-09 13:30:00'),
    //   title: 'Prueba de testing calendar',
    //   color: {
    //     primary: '#ad2121',
    //     secondary: '#FAE3E3',
    //   },
    //   // actions: this.actions,
    //   // allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: false,
    // },
    // {
    //   start: new Date('2022-05-09 08:00:00'),
    //   end: new Date('2022-05-09 11:00:00'),
    //   title: 'An event with no end date',
    //   color: {
    //     primary: '#e3bc08',
    //     secondary: '#FDF1BA',
    //   },
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    //   // actions: this.actions,
    // },
    // {
    //   start: new Date('2022-05-09 04:00:00'),
    //   end: new Date('2022-05-09 06:00:00'),
    //   title: 'A long event that spans 2 months',
    //   color: {
    //     primary: '#1e90ff',
    //     secondary: '#D1E8FF',
    //   },
    //   draggable: true,
    //   // allDay: true,
    // },
    // {
    //   start: new Date('2022-05-09 09:00:00'),
    //   end: new Date('2022-05-09 18:00:00'),
    //   title: 'A draggable and resizable event',
    //   color: {
    //     primary: '#1e90ff',
    //     secondary: '#D1E8FF',
    //   },
    //   // actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  constructor(private userService: AppService, private service: GeneralService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    console.log(this.userService.user);
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
          console.log(res);
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
          console.log(res);
          const data = res.data  || [];
          if (data.length>0) {
                const newArray:any = [];
                data.forEach((value:any) => {
                const structure = {
                  start: new Date(value.start),
                  // end: new Date('2022-05-09 13:30:00'),
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
                newArray.push(structure);
                
              });
              // setTimeout(() => {
                this.events = newArray;
                // setTimeout(() => {
                //   this.events = newArray;
                // }, 3000);
              // }, 100);
              // console.log(this.events, 'evensss', newArray);
          }
        }, () => { this.loading = false; }, () => { this.loading = false; });
    }
  }
}
