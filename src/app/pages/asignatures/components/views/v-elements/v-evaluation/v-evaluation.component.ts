import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import Swal from 'sweetalert2';
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
  constructor(private service: GeneralService, private router: Router, public datepipe: DatePipe) { }
  ngOnChanges():void {
    this.pending = this.pending;
    console.log(this.pending, this.element, 'elllllllllll', this.userInfo);
    
  }
  ngOnInit(): void {
    this.getIp();
    console.log(this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'));
    
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

  get validFechaHoraFin() {
    if (this.pending) {
      const fechaHoraFin = this.pending?.fecha_fin;
      const DateActual:any = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
      if (fechaHoraFin>=DateActual) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

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

}
