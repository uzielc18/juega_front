import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';

@Component({
  selector: 'app-m-course-free',
  templateUrl: './m-course-free.component.html',
  styleUrls: ['./m-course-free.component.scss']
})
export class MCourseFreeComponent implements OnInit {
  loading:boolean = false;
  formHeaderOne: any = FormGroup;
  formHeaderTo: any = FormGroup;
  constructor(public activeModal: NbDialogRef<MCourseFreeComponent>, private service: GeneralService, private formBuilder: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fieldReactiveOne();
    this.fieldReactiveTo();
  }
  private fieldReactiveOne() {
    const controls = {
      id_tipo_curso: ['', [Validators.required]],
      id_programa_estudio: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      id_docente: ['', [Validators.required]],
      horas_semana: ['', [Validators.required]],
      id_idioma: ['', [Validators.required]],
      ciclo: ['', [Validators.required]],
      cupos: ['', [Validators.required]],
      aula: ['', [Validators.required]],
      grupo: ['', [Validators.required]],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      tipo_nota: ['', [Validators.required]],
      nota_min: ['', [Validators.required]],
      nota_max: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    };
    this.formHeaderOne = this.formBuilder.group(controls);
  }
  private fieldReactiveTo() {
    const controls = {
      inscripcion: [false],
      consultas: [false],
      pago: [false],
      chat: [false],
      fecha_inicio_inscr: [''],
      fecha_fin_inscr: [''],
      precio_local: [''],
      precio_dolares: [''],
      porcentaje_descuento: [''],
      file_silabo: ['', [Validators.required]],
      file_guia_curso: ['', [Validators.required]],
      url_video_intro: ['', [Validators.required]],
      file_portada: ['', [Validators.required]],
      file_miniatura: ['', [Validators.required]],
    };
    this.formHeaderTo = this.formBuilder.group(controls);
  }
  closeModal() {
    this.activeModal.close('close');
  }
  changeSteps($event:any) {
    console.log($event);
    
  }
  nextPasoOne(nbStepperNext:any, one:any) {
    const serviceName = '';
    const forms = this.formHeaderOne.value;
    const params = {
      id_tipo_curso: forms.id_tipo_curso,
      id_programa_estudio: forms.id_programa_estudio,
      nombre: forms.nombre,
      id_docente: forms.id_docente,
      horas_semana: forms.horas_semana,
      id_idioma: forms.id_idioma,
      ciclo: forms.ciclo,
      cupos: forms.cupos,
      aula: forms.aula,
      grupo: forms.grupo,
      fecha_inicio: this.datePipe.transform(forms.fecha_inicio, 'yyyy-MM-dd'),
      fecha_fin: this.datePipe.transform(forms.fecha_fin, 'yyyy-MM-dd'),
      tipo_nota: forms.tipo_nota,
      nota_min: forms.nota_min,
      nota_max: forms.nota_max,
      descripcion: forms.descripcion,
    }
    console.log(nbStepperNext, 'ehhhhhh=======> ', one, 'values', params);
    nbStepperNext.next();
  }

  toggleChangeInscr($event:any) {
    this.formHeaderTo.controls['fecha_inicio_inscr'].setValue('');
    this.formHeaderTo.controls['fecha_fin_inscr'].setValue('');
    if ($event) {
      this.formHeaderTo.controls['fecha_inicio_inscr'].setValidators([Validators.required]);
      this.formHeaderTo.controls['fecha_inicio_inscr'].updateValueAndValidity();

      this.formHeaderTo.controls['fecha_fin_inscr'].setValidators([Validators.required]);
      this.formHeaderTo.controls['fecha_fin_inscr'].updateValueAndValidity();
    } else {
      this.formHeaderTo.controls['fecha_inicio_inscr'].setValidators([]);
      this.formHeaderTo.controls['fecha_inicio_inscr'].updateValueAndValidity();

      this.formHeaderTo.controls['fecha_fin_inscr'].setValidators([]);
      this.formHeaderTo.controls['fecha_fin_inscr'].updateValueAndValidity();
    }
  }
  toggleChangePago($event:any) {
    this.formHeaderTo.controls['precio_local'].setValue('');
    this.formHeaderTo.controls['precio_dolares'].setValue('');
    this.formHeaderTo.controls['porcentaje_descuento'].setValue('');
    if ($event) {
      this.formHeaderTo.controls['precio_local'].setValidators([Validators.required]);
      this.formHeaderTo.controls['precio_local'].updateValueAndValidity();

      this.formHeaderTo.controls['precio_dolares'].setValidators([Validators.required]);
      this.formHeaderTo.controls['precio_dolares'].updateValueAndValidity();

      this.formHeaderTo.controls['porcentaje_descuento'].setValidators([Validators.required]);
      this.formHeaderTo.controls['porcentaje_descuento'].updateValueAndValidity();
    } else {
      this.formHeaderTo.controls['precio_local'].setValidators([]);
      this.formHeaderTo.controls['precio_local'].updateValueAndValidity();

      this.formHeaderTo.controls['precio_dolares'].setValidators([]);
      this.formHeaderTo.controls['precio_dolares'].updateValueAndValidity();

      this.formHeaderTo.controls['porcentaje_descuento'].setValidators([]);
      this.formHeaderTo.controls['porcentaje_descuento'].updateValueAndValidity();
    }
  }
  backPasoTo(nbStepperNext:any, one:any) {
    nbStepperNext.previous();
  }
  nextPasoTo(nbStepperNext:any, one:any) {
    const serviceName = '';
    const forms = this.formHeaderTo.value;
    const params = {
      inscripcion: forms.inscripcion,
      consultas: forms.consultas,
      pago: forms.pago,
      chat: forms.chat,
      fecha_inicio_inscr: this.datePipe.transform(forms.fecha_inicio_inscr, 'yyyy-MM-dd'),
      fecha_fin_inscr: this.datePipe.transform(forms.fecha_fin_inscr, 'yyyy-MM-dd'),
      precio_local: forms.precio_local,
      precio_dolares: forms.precio_dolares,
      porcentaje_descuento: forms.porcentaje_descuento,
      file_silabo: forms.file_silabo,
      file_guia_curso: forms.file_guia_curso,
      url_video_intro: forms.url_video_intro,
      file_portada: forms.file_portada,
      file_miniatura: forms.file_miniatura,
    }
    console.log(nbStepperNext, 'ehhhhhh=======> ', one, 'values', params);
    nbStepperNext.next();
  }
}
