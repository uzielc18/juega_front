import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-c-pendings-time',
  templateUrl: './c-pendings-time.component.html',
  styleUrls: ['./c-pendings-time.component.scss']
})
export class CPendingsTimeComponent implements OnInit {

  @Input() item: any;
  daysLeft: any;
  hoursLeft: any;
  minutesLeft: any;
  secondsLeft: any;
  expiredDays: any;
  expiredHours: any;
  expiredMinutes: any;
  expiredSeconds: any;
  daysMap = {
    '=0': '',
    '=1': '1 dia,',
    other: '# dias,',
  };

  hoursMap = {
    '=0': '',
    '=1': '1 hora,',
    other: '# horas,',
  };

  minutesMap = {
    '=0': '',
    '=1': '1 minuto.',
    other: '# minutos.',
  };
  constructor() {
    setInterval(() => {
        this.getTimes(this.item.fecha_fin)
    }, 1000)
  }

  ngOnInit(): void {
  }

  getTimes(fechaFin: any){
    const countDate = new Date(fechaFin?.replace(' ', 'T')).getTime();
    const now = new Date().getTime();
    const left = countDate - now;
    const expired = now - countDate;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    this.daysLeft = Math.floor(left / day);
    this.hoursLeft = Math.floor((left % day) / hour);
    this.minutesLeft = Math.floor((left % hour) / minute);
    this.secondsLeft = Math.floor((left % minute) / second);

    this.expiredDays = Math.floor(expired / day);
    this.expiredHours = Math.floor((expired % day) / hour);
    this.expiredMinutes = Math.floor((expired % hour) / minute);
    this.expiredSeconds = Math.floor((expired % minute) / second);
    return
  }
}
