import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { ResponseAperturaComponent } from '../../../modals/response-apertura/response-apertura.component';

@Component({
  selector: 'app-justifications',
  templateUrl: './justifications.component.html',
  styleUrls: ['./justifications.component.scss']
})
export class JustificationsComponent implements OnInit {
  @Input() curso:any;
  @Input() userInfo:any;
  justificatiosn:any = [];
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
    '=1': '1 minuto,',
    other: '# minutos,',
  };

  secondsMap = {
    '=0': '.',
    '=1': '1 segundo.',
    other: '# segundos.',
  };
  loading: boolean = false;
  constructor(private generalService: GeneralService,
    private dialogService: NbDialogService) {
    }

  ngOnInit(): void {
    // console.log(this.userInfo.user.person.id);
    
    // setTimeout(() => {
    //   this.listJustificate();
    // }, 5000);
  }
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    const val = JSON.parse(sesion);
    if (val && val.rol) {
      return val;
    } else {
      return '';
    }
  }
  listJustificate() {
    const serviceName = 'list-justifications';
    const params = {
      estado_justification : 'pendiente',
      person_id: this.userInfo.user.person.id,
    };
    this.loading = true;
    this.generalService.nameIdAndIdParams$(serviceName, this.curso.id_carga_curso_docente, this.rolSemestre.rol.id, params).subscribe((res:any) => {
      this.justificatiosn = res.data || [];
    }, () => {this.loading = false;}, () => {this.loading = false;})
  }

  openRespuesta(item:any) {
    if (this.rolSemestre.rol.name === 'Docente') {

      this.dialogService.open(ResponseAperturaComponent, {
          dialogClass: 'dialog-limited-height',
          context: {
            item: item,
          },
          closeOnBackdropClick: false,
          closeOnEsc: false,
        })
        .onClose.subscribe(result => {
          if (result === 'ok') {
            this.listJustificate();
          }
        });
    }
  }
  countdown(fecha: any) {
    const countDate = new Date(fecha).getTime();
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
    
    // return  this.expiredDays + ' día(s)' + ' ' + this.expiredHours + ' hora(s)' + ' ' + this.expiredMinutes + ' minuto(s)' + ' '  + this.expiredSeconds + ' segundo(s)';
    return  this.expiredDays + ' día(s)' + ' ' + this.expiredHours + ' hora(s)';
  }
}
