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
  infoCalendars:any = [];
  events: CalendarEvent[] = [];
  valueCalendar:any = [];
  colors:any = [
    {
      id: 1,
      color: 'rgb(213, 0, 0)',
    },
    {
      id: 2,
      color: 'rgb(230, 124, 115)',
    },
    {
      id: 3,
      color: 'rgb(244, 81, 30)',
    },
    {
      id: 4,
      color: 'rgb(246, 191, 38)',
    },
    {
      id: 5,
      color: 'rgb(51, 182, 121)',
    },
    {
      id: 6,
      color: 'rgb(11, 128, 67)',
    },
    {
      id: 7,
      color: 'rgb(3, 155, 229)',
    },
    {
      id: 8,
      color: 'rgb(63, 81, 181)',
    },
    {
      id: 9,
      color: 'rgb(121, 134, 203)',
    },
    {
      id: 10,
      color: 'rgb(142, 36, 170)',
    },
    {
      id: 11,
      color: 'rgb(97, 97, 97)',
    }
  ];
  constructor(private userService: AppService, private service: GeneralService, public datepipe: DatePipe,
    private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.getTypeCalendars();
    // console.log(this.userService);
    
  }
  get sessionConfigCalendarType() {
    const sesion: any = sessionStorage.getItem("configAssign");
    let val = JSON.parse(sesion);
    if (val && val.type_calendar) {
      return val.type_calendar;
    } else {
      return 'mes';
    }
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
        calendar: this.sessionConfigCalendarType,
      }
      this.loading = true;
        this.service.nameIdParams$(serviceName, this.userService.user.id, params).subscribe((res:any) => {
          this.infoCalendars = res.data  || [];
          if (this.infoCalendars.length>0) {
                const array:any = [];
                const origin:any = [];
                this.infoCalendars.forEach((element:any) => {
                if (element.calendario.length>0) {
                  element.calendario.map((a:any)=> {
                    a.nombre_copy = a.nombre.substr(0,20) + '...';
                    if (a.checked === 1) {
                      a.checked = true;
                      array.push(a.codigo);
                      origin.push(a.origen);
                    } else {
                      a.checked = false;
                    }
                  });
                }
              });
              var unique = [...new Set(origin)]; // No duplicar valores iguales
              const value = {
                codigos: array.join(','),
                origen: unique.join(','),
              }

              setTimeout(() => {
                this.getMyEvents(value);
                
              }, 1000);
          }
        }, () => { this.loading = false; }, () => { this.loading = false; });
    }
  }
  monthWeekDay($event:any) {
    const type = this.renameTypeCalendarEspanish($event);
    const params = {
      type_calendar: type,
    }
    sessionStorage.setItem("configAssign", JSON.stringify(params));
    // this.getTypeCalendars();
  }
  renameTypeCalendarEspanish($event:any) {
    let type = 'mes';
    if ($event) {
      type = $event === 'month' ? 'mes' : $event === 'week' ? 'semana' : $event === 'day' ? 'dia' : 'mes';
    }
    return type;
  }
  renameTypeCalendarIngles($event:any) {
    let type = 'month';
    if ($event) {
      type = $event === 'mes' ? 'month' : $event === 'semana' ? 'week' : $event === 'dia' ? 'day' : 'month';
    }
    return type;
  }
  typeElementCal($event:boolean, item:any) {
    item.checked = $event;
    setTimeout(() => {
     const value = this.reccore(); 
      this.getMyEvents(value);
    }, 100);

    
  }
  reccore() {
    const array:any = [];
    const origin:any = [];
    this.infoCalendars.forEach((element:any) => {
      if (element.calendario.length>0) {
        element.calendario.map((a:any)=> {
          if (a.checked) {
            array.push(a.codigo);
            origin.push(a.origen);
          }
        });
      }
    });
    var unique = [...new Set(origin)]; // No duplicar valores iguales
    const value = {
      codigos: array.join(','),
      origen: unique.join(','),
    }
    return value;
  }
  getMyEvents(values:any) {
    const serviceName = END_POINTS.base_back.calendar + '/mis-eventos';
    if (this.userService.user.id) {
      const params:any = {
        fecha: this.datepipe.transform(this.date, 'yyyy-MM-dd'),
        calendar: this.sessionConfigCalendarType,
        type: values.codigos || '',
        origen: values.origen || '',
      }
      this.loading = true;
        this.service.nameIdParams$(serviceName, this.userService.user.id, params).subscribe((res:any) => {
          this.valueCalendar = res.data  || [];
          if (this.valueCalendar.length>0) {
                const newArray:any = [];
                this.valueCalendar.forEach((value:any) => {

                  if (value && value.origen === 'google') {
                    let col = this.colors.find((a:any) => a.id === Number(value.colorId));
                    value.color_primary = col ? col.color : 'rgb(121, 134, 203)';
                  }

                  const structure:any = {
                    start: new Date(value.start),
                    id: value.id,
                    title: value.title,
                    color: {
                      primary: value.color_primary,
                      secondary: '#FAE3E3',
                    },
                    // actions: this.actions,
                    allDay: value.allDay === 1 ? true : false,
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
          } else {
            this.events = [];
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
          datos: values,
          email: this.userService.user.email,
          // response: params,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false
      }).onClose.subscribe(result => {
        if (result === 'ok') {
          // this.filtrar();
          this.getTypeCalendars();
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
      const values:any = {
        email: this.userService.user.email,
      }
       if (values && values.email) {
         this.dialogService.open(MEventGoogleCalendarComponent, {
           dialogClass: 'dialog-limited-height',
           context: {
             datos: values
           },
           closeOnBackdropClick: false,
           closeOnEsc: false
         }).onClose.subscribe(result => {
           if (result === 'ok') {
             // this.filtrar();
             this.getTypeCalendars();
           }
         });
       }
  }
}
