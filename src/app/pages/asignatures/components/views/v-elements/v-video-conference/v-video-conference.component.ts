import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-v-video-conference',
  templateUrl: './v-video-conference.component.html',
  styleUrls: ['./v-video-conference.component.scss']
})
export class VVideoConferenceComponent implements OnInit {
  @Input() element: any;
  @Input() userInfo: any;

  fechaFin: any;

  daysLeft: any;
  hoursLeft: any;
  minutesLeft: any;
  secondsLeft: any;
  expiredDays: any;
  expiredHours: any;
  expiredMinutes: any;
  expiredSeconds: any;

  tiempo_vencido: boolean = false;
  tiempo_calificado: any;

  daysMap = {
    '=0': '',
    '=1': '1 dia,',
    'other': '# dias,'
  }

  hoursMap = {
    '=0': '',
    '=1': '1 hora,',
    'other': '# horas,'
  }

  minutesMap = {
    '=0': '',
    '=1': '1 minuto,',
    'other': '# minutos,'
  }

  secondsMap = {
    '=0': '.',
    '=1': '1 segundo.',
    'other': '# segundos.'
  }

  constructor(
    private formBuilder: FormBuilder,
  ) {
    setInterval(() => {
      this.countdown(this.element?.fecha_fin)
    }, 1000);
  }

  ngOnInit(): void {
  }

  countdown(fecha_fin: any) {
    const countDate = new Date(fecha_fin).getTime();
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

    if (this.daysLeft <= 0 && this.hoursLeft <= 0 && this.minutesLeft <= 0 && this.secondsLeft <= 0) {
      this.tiempo_vencido = true; // mejorar la logica
    }
  }
}
