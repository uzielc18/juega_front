import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { MExamViewModalComponent } from 'src/app/shared/components/exam-view/m-exam-view-modal/m-exam-view-modal.component';
import Swal from 'sweetalert2';
import { CalificarElementEstudentComponent } from '../../../modals/calificar-element-estudent/calificar-element-estudent.component';
import { RequestAperturaComponent } from '../../../modals/request-apertura/request-apertura.component';
@Component({
  selector: 'app-v-evaluation',
  templateUrl: './v-evaluation.component.html',
  styleUrls: ['./v-evaluation.component.scss']
})
export class VEvaluationComponent implements OnInit, OnChanges {
  @Input() element: any;
  @Input() userInfo: any;
  @Input() pending: any;
  ip:any = '';
  @Output() loadingss: EventEmitter<any> = new EventEmitter();
  loading: boolean = false;

  daysLeft: any;
  hoursLeft: any;
  minutesLeft: any;
  secondsLeft: any;
  expiredDays: any;
  expiredHours: any;
  expiredMinutes: any;
  expiredSeconds: any;
  venceDays: any;
  venceHours: any;
  venceMinutes: any;
  venceSeconds: any;

  tiempo_vencido: boolean = false;
  // tiempo_calificado: any;

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
  constructor(private service: GeneralService, private router: Router, public datepipe: DatePipe,
    private dialogService: NbDialogService) {
    setInterval(() => {
      if (this.pending) {
        this.countdown(this.pending?.student_pending?.fecha_fin);
      }
    }, 1000);
  }
  ngOnChanges():void {
    this.pending = this.pending;
    // console.log(this.pending, this.element, 'elllllllllll', this.userInfo);

  }
  ngOnInit(): void {
    this.getIp();

    // console.log(this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'));

  }
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    const val = JSON.parse(sesion);
    if (val && val.rol){
      return val;
    } else {
      return '';
    }
  }
  countdown(fecha_fin: any) {
    const countDate = new Date(fecha_fin).getTime();
    const now = new Date().getTime();
    const left = countDate - now;
    const expired = now - countDate;
    const vence = countDate - now

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

    this.venceDays = Math.floor(vence / day);
    this.venceHours = Math.floor((vence % day) / hour);
    this.venceMinutes = Math.floor((vence % hour) / minute);
    this.venceSeconds = Math.floor((vence % minute) / second);

    if (this.daysLeft <= 0 && this.hoursLeft <= 0 && this.minutesLeft <= 0 && this.secondsLeft <= 0) {
      this.tiempo_vencido = true;
    }else{
      this.tiempo_vencido = false;
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
          // this.refreshPending.emit();
        }
      });
  }
  // get validFechaHoraFin() {
  //   if (this.pending) {
  //     const fechaHoraFin = this.pending?.fecha_fin;
  //     const DateActual:any = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
  //     if (fechaHoraFin>=DateActual) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // }

  getIp() {
    this.service.apisExternas$('GET', 'https://api.ipify.org/?format=json', {}).subscribe(res => {
      if (res && res['status'] === 200) {
        this.ip = res.body && res.body['ip'] || '';
      }
    })
    // fetch('https://api.ipify.org/?format=json').then(result => {
    //   if (result && result['status'] === 200) {
    //       result.json().then(r => {
    //         this.ip = r['ip'];
    //       });
    //   }
    // });
  }
  initEvaluations() {
    const serviceName = END_POINTS.base_back.quiz + '/examStudents';
    const params = {
      pending_id: this.pending?.student_pending?.id || '',
      exam_id: this.pending.exam.id || '',
      persons_student_id:this.pending?.student_pending?.persons_student_id || '',
      codigo_student: this.userInfo?.person?.codigo || '',
      ip_student: this.ip,
      device: this.verifyDevice(),
    }
    if (params && params.pending_id && params.exam_id && params.persons_student_id && params.codigo_student && params.ip_student && params.device) {
      Swal.fire({
        title: 'Evaluación',
        text: '¿ Desea iniciar la evaluación ?',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        // timer: 2000,
      }).then((result:any) => {
          if (result.isConfirmed) {
            this.loadingss.emit(true);
            this.service.addNameData$(serviceName, params).subscribe(res => {
              if (res.success) {
                this.router.navigate([`/exam/${params.pending_id}/${params.persons_student_id}`]);
              }
            }, () => {this.loadingss.emit(false);}, () => {this.loadingss.emit(false);});
          }
      });
    }

  }
  backQuestions() {
    const values = this.pending?.student_pending || '';
    if (values && values.id && values.persons_student_id) {
      this.router.navigate([`/exam/${values.id}/${values.persons_student_id}`]);
    }
  }
  verifyDevice() {
    let a = navigator.userAgent;
    let agents = new Array("iPhone","iPad","Android","SymbianOS", "Windows Phone","iPod");
    let flag = true;
    for(let i = 0; i < agents.length; i++) {
      if(a.indexOf(agents[i]) > 0) {
        flag = false;
      }
    }
    if(flag) {
      return 'Ordenador';
    } else {
      return 'Movil';
    }
  }
  verEvaluacion() {
    const values:any = {
      person_id: this.pending?.student_pending?.persons_student_id || '',
      pending_id: this.pending?.student_pending?.id || '',
      rol: this.rolSemestre.rol,
    }
    this.dialogService.open(MExamViewModalComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        datos: values,
        // response: params,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
      }
    });
  }
  calificar(element: any) {
    this.dialogService.open(CalificarElementEstudentComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        element: element,
        rol: this.rolSemestre.rol,
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
