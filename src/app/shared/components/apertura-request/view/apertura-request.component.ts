import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NbDialogRef} from "@nebular/theme";
import {GeneralService} from "../../../../providers";

@Component({
  selector: 'app-apertura-request',
  templateUrl: './apertura-request.component.html',
  styleUrls: ['./apertura-request.component.scss']
})
export class AperturaRequestComponent implements OnInit {

  @Input() elemento:any;
  @Input() pendiente:any;
  @Input() rolSemestre:any;
  @Input() userInfo:any;
  loading:boolean = false;

  daysLeft: any;
  hoursLeft: any;
  minutesLeft: any;
  secondsLeft: any;
  expiredDays: any;
  expiredHours: any;
  expiredMinutes: any;
  expiredSeconds: any;
  tiempo_vencido: boolean = false;
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
  formHeader: any = FormGroup;

  constructor(public activeModal: NbDialogRef<AperturaRequestComponent>,
              private generalService: GeneralService,
              private fb: FormBuilder) {

    setInterval(() => {
      if (this.pendiente) {
        this.countdown(this.pendiente?.fecha_fin);
      }
    }, 1000);
  }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      justification: ['', [Validators.required]],
    };
    this.formHeader = this.fb.group(controls);
  }
  closeModal() {
    this.activeModal.close('close');
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
      this.tiempo_vencido = true;
    }
  }
  saveJustificate() {
    this.loading = true
    const serviceName = 'justifications';
    const params = {
      pending_id:this.pendiente.pending_id,
      persons_student_id: this.rolSemestre.persons_student.person_id|| '',
      persons_teacher_id: this.elemento.persons_teacher_id || '',
      element_id: this.elemento.element_id || '',
      id_carga_curso_docente: this.elemento.id_carga_curso_docente || '',
      estado_justification: 'pendiente',
      justification: this.formHeader.value.justification,
      respuesta: null,
      userid: this.userInfo.id || ''
    };
    this.loading = true;
    this.generalService.addNameData$(serviceName, params).subscribe((res:any) => {
      if (res.success) {
        this.activeModal.close('ok');
      }
    }, () => {this.loading = false}, () => {this.loading = false})
  }
}
