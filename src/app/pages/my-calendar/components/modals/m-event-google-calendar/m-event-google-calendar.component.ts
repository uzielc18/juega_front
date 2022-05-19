import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbDialogRef } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-m-event-google-calendar',
  templateUrl: './m-event-google-calendar.component.html',
  styleUrls: ['./m-event-google-calendar.component.scss']
})
export class MEventGoogleCalendarComponent implements OnInit {
  loading:boolean = false;
  formHeader: any = FormGroup;
  min: any = Date;
  @Input() datos:any;
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
  constructor(public activeModal: NbDialogRef<MEventGoogleCalendarComponent>, private formBuilder: FormBuilder,
    dateService: NbDateService<Date>, public datepipe: DatePipe, private service: GeneralService) {
    let date:any = Date;
        date = dateService.today();
        this.min = dateService.addDay(date, 0);
  }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      title: ['', [Validators.required]],
      descripcion: [''],
      fecha_inicio: ['', [Validators.required]],
      hora_inicio: [''],
      fecha_fin: [''],
      hora_fin: [''],
      color: ['', [Validators.required]],
      location: [''],
      attendees: [''],
      allDay: [false],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.changeToggle(this.formHeader.value.allDay);
  }
  closeModal() {
    this.activeModal.close('close');
  }
  saveGoogle() {
    const serviceName = END_POINTS.base_back.calendar + '/store';
    const forms = this.formHeader.value;
    let f_inicio:any = '';
    let f_fin:any = '';
    if (forms.allDay) { // todo el día
        f_inicio = this.datepipe.transform(forms.fecha_inicio, 'yyyy-MM-dd');
    } else {
        f_inicio = this.datepipe.transform(forms.fecha_inicio, 'yyyy-MM-dd') + ' ' + this.datepipe.transform(forms.hora_inicio, 'HH:mm:ss');
        f_fin = this.datepipe.transform(forms.fecha_fin, 'yyyy-MM-dd') + ' ' + this.datepipe.transform(forms.hora_fin, 'HH:mm:ss');
    }
    let color = this.colors.find((a:any) => a.color === forms.color);
    const params = {
      title: forms.title,
      descripcion: forms.descripcion,
      fecha_inicio: f_inicio,
      fecha_fin: f_fin,
      color: color ? color.id : 0,
      location: forms.location,
      attendees: forms.attendees,
      allDay: forms.allDay,
      email: this.datos.email,
    }
    // console.log(params);
    this.loading = true;
    this.service.addNameData$(serviceName, params).subscribe((res:any) => {
      if (res.success) {
        this.activeModal.close('ok');
      }
    }, () => {this.loading = false}, ()=> {this.loading=false});
    
  }
  changeToggle($event: any) {
    // console.log($event);
    if ($event) {
      this.formHeader.controls['hora_inicio'].setValue('');
      this.formHeader.controls['hora_inicio'.toString()].setValidators([]);
      this.formHeader.controls['hora_inicio'.toString()].updateValueAndValidity();

      this.formHeader.controls['fecha_fin'].setValue('');
      this.formHeader.controls['fecha_fin'.toString()].setValidators([]);
      this.formHeader.controls['fecha_fin'.toString()].updateValueAndValidity();

      this.formHeader.controls['hora_fin'].setValue('');
      this.formHeader.controls['hora_fin'.toString()].setValidators([]);
      this.formHeader.controls['hora_fin'.toString()].updateValueAndValidity();

    } else {

      this.formHeader.controls['hora_inicio'].setValue('');
      this.formHeader.controls['hora_inicio'.toString()].setValidators([Validators.required]);
      this.formHeader.controls['hora_inicio'.toString()].updateValueAndValidity();

      this.formHeader.controls['fecha_fin'].setValue('');
      this.formHeader.controls['fecha_fin'.toString()].setValidators([Validators.required]);
      this.formHeader.controls['fecha_fin'.toString()].updateValueAndValidity();

      this.formHeader.controls['hora_fin'].setValue('');
      this.formHeader.controls['hora_fin'.toString()].setValidators([Validators.required]);
      this.formHeader.controls['hora_fin'.toString()].updateValueAndValidity();
    }
  }
  
}
