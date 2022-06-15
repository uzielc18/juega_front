import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { DIRECTORY } from 'src/app/shared/directorios/directory';
import { MPortadaMiniaturaComponent } from '../m-portada-miniatura/m-portada-miniatura.component';

@Component({
  selector: 'app-m-course-free',
  templateUrl: './m-course-free.component.html',
  styleUrls: ['./m-course-free.component.scss']
})
export class MCourseFreeComponent implements OnInit {
  loading:boolean = false;
  formHeaderOne: any = FormGroup;
  formHeaderTo: any = FormGroup;
  @Input() userInfo:any;
  key_file:any;
  directorioSilabo:any = DIRECTORY.courses + '/silabos';
  directorioGuiaEst:any = DIRECTORY.courses + '/guia-estudios';
  directorioPortadas:any = DIRECTORY.courses + '/portadas';
  constructor(public activeModal: NbDialogRef<MCourseFreeComponent>, private service: GeneralService, private formBuilder: FormBuilder, private datePipe: DatePipe,
    private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.fieldReactiveOne();
    this.fieldReactiveTo();
  }
  private fieldReactiveOne() {
    const controls = {
      id_curso: [''],
      id_carga_curso_docente: [''],
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
      url_video_intro: ['', [Validators.required, Validators.maxLength(255)]],
      file_portada: ['', [Validators.required]],
      file_portada_url_base64: ['', [Validators.required]],
      file_miniatura: ['', [Validators.required]],
      file_miniatura_url_base64: ['', [Validators.required]],
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
  valueFileSilabo($event:any) {
    console.log($event);
    
    this.formHeaderTo.controls['file_silabo'].setValue('');
    if ($event) {
      this.formHeaderTo.controls['file_silabo'].setValue($event.value.nombre_s3);
    }
  }
  valueFileGuiaEstudio($event:any) {
    console.log($event);
    this.formHeaderTo.controls['file_guia_curso'].setValue('');
    if ($event) {
      this.formHeaderTo.controls['file_guia_curso'].setValue($event.value.nombre_s3);
    }
  }
  clearFileSilabo() {
    this.formHeaderTo.controls['file_silabo'].setValue('');
  }
  clearFileGuia() {
    this.formHeaderTo.controls['file_guia_curso'].setValue('');
  }
  clearFilePortada() {
    this.formHeaderTo.controls['file_portada'].setValue('');
  }
  clearFileMiniatura() {
    this.formHeaderTo.controls['file_portada'].setValue('');
  }
  keyFile() {
    if (this.formHeaderOne.value.id_carga_curso_docente) {
      this.key_file = this.userInfo?.person?.codigo + '-' + this.formHeaderOne.value.id_carga_curso_docente;
      return this.key_file;
    } else {
      this.key_file = this.userInfo?.person?.codigo;
      return this.key_file;
    }
  }
  openRecortePortadaMin(type:any) {
    this.dialogService.open(MPortadaMiniaturaComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        keyFile: this.keyFile(),
        directori: this.directorioPortadas,
        // userInfo: this.appUserInfo.user,

      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result && result.close === 'ok') {
        console.log(result, 'eeeeeeeeeeeee');
        if (type == 'portada') {
          this.formHeaderTo.controls['file_portada'].setValue('');
          this.formHeaderTo.controls['file_portada_url_base64'].setValue('');
          if (result && result.value) {
            this.formHeaderTo.controls['file_portada'].setValue(result.value.nombre);
            this.formHeaderTo.controls['file_portada_url_base64'].setValue(result.value.base64);
          }
        }

        if (type == 'miniatura') {
          this.formHeaderTo.controls['file_miniatura'].setValue('');
          this.formHeaderTo.controls['file_miniatura_url_base64'].setValue('');
          if (result && result.value) {
            this.formHeaderTo.controls['file_miniatura'].setValue(result.value.nombre);
            this.formHeaderTo.controls['file_miniatura_url_base64'].setValue(result.value.base64);
          }
        }
      }
    });
  }
}
