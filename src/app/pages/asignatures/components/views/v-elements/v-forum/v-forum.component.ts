import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { CalificarElementEstudentComponent } from '../../../modals/calificar-element-estudent/calificar-element-estudent.component';
import { RequestAperturaComponent } from '../../../modals/request-apertura/request-apertura.component';


@Component({
  selector: 'app-v-forum',
  templateUrl: './v-forum.component.html',
  styleUrls: ['./v-forum.component.scss']
})
export class VForumComponent implements OnInit, OnChanges {
  @Input() element: any;
  @Input() userInfo: any;
  @Input() pending: any;
  @Output() refreshPending: EventEmitter<any> = new EventEmitter();
  loading: boolean = false;
  formHeader: any = FormGroup;
  @Input() listResponses:any = [];

  daysLeft: any;
  hoursLeft: any;
  minutesLeft: any;
  secondsLeft: any;
  expiredDays: any;
  expiredHours: any;
  expiredMinutes: any;
  expiredSeconds: any;

  tiempo_vencido: boolean = false;
  // tiempo_calificado: any;

  form: any = FormGroup;
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
  constructor(private dialogService: NbDialogService
  ) {
    setInterval(() => {
      if (this.pending) {
        this.countdown(this.pending?.student_pending?.fecha_fin);
      }
    }, 1000);
  }
  ngOnChanges():void {
    this.pending = this.pending;
    this.listResponses = this.listResponses;
  }
  ngOnInit(): void {
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
  countdown(fecha_fin: any) {
    const countDate = new Date(fecha_fin?.replace(' ', 'T')).getTime();
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
      this.tiempo_vencido = true;
    }
  }
  justifications() {
    this.dialogService.open(RequestAperturaComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          elemento: this.element,
          pendiente: this.pending,
          rolSemestre: this.rolSemestre,
          userInfo: this.userInfo,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        if (result === 'ok') {
          this.refreshPending.emit();
        }
      });
  }
  calificar(element: any) {
    this.dialogService.open(CalificarElementEstudentComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        element: element,
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


  get getValidComent() {
    if (this.rolSemestre?.rol?.name === 'Estudiante') {
      let valids = false;
      if (this.pending?.student_pending?.pending_forum?.permitir_comentarios === 'NO' && this.pending?.student_pending?.pending_forum?.forums_responses?.length < 1) {
        valids = true;
      }
      if (this.pending?.student_pending?.pending_forum?.permitir_comentarios === 'SI') {
        valids = true;
      }
      return valids;
    } else {
      return false;
    }
  }

  changeEmit() {
    setTimeout(() => {
      this.refreshPending.emit();
    }, 1000);
  }
}
