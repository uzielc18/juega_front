import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-carpeta',
  templateUrl: './carpeta.component.html',
  styleUrls: ['./carpeta.component.scss']
})
export class CarpetaComponent implements OnInit {
  loading: boolean = false;
  formHeader: any = FormGroup;
  options: any = 'N';
  @Output() saveCloseValue = new EventEmitter<any>();
  @Input() topics: any;
  @Input() unidad: any;
  @Input() curso: any;

  @Input() item: any;
  @Input() code: any;
  @Input() valueMenu: any;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();
  settValuesMore:any;
  constructor(private formBuilder: FormBuilder, private generalServi: GeneralService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      course_id: ['', [Validators.required]],
      topic_id: ['', [Validators.required]],
      type_element_id: ['', [Validators.required]],
      id_carga_curso_docente: ['', [Validators.required]],
      id_programa_estudio: ['', [Validators.required]],

      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],

      fecha: [''],
      // fecha_inicio: ['', [Validators.required]],
      // hora_inicio: ['', [Validators.required]],
      // fecha_fin: ['', [Validators.required]],
      // hora_fin: ['', [Validators.required]],

      tipo: ['CARPETA', [Validators.required]],

      visibilidad: ['S'],
      calificable: [true],
      duracion: ['180', [Validators.required]],
      permitir_comentarios: [false],

      estado: ['1', [Validators.required]],
      userid: [''],

    };
    this.formHeader = this.formBuilder.group(controls);
    this.setValuesPre();
    this.setMenuValues();
    this.setFechaActual();
    if(this.code === 'UPDATE') {
      this.setObjectUpdate();
    }
  }
  setValuesPre() {
    this.formHeader.patchValue({
      course_id: this.unidad.course_id || '',
      topic_id: this.topics.id || '',
      id_carga_curso_docente: this.topics.id_carga_curso_docente || '',
      id_programa_estudio: this.curso.programa_estudio_id || '',
    })
  }
  formsValues($event:any) {
    this.formHeader.patchValue({
      calificable: $event.calificable,
      duracion: $event.duration || '',
      visibilidad: $event.visibilidad,
      permitir_comentarios: $event.permitir_comentarios,
    })
  }

  moreOptions(value:any){
    if (value === 'N') {
      this.options = 'S';
    } else {
      this.options = 'N';
    }
  }
  setMenuValues() {
    this.formHeader.patchValue({
      type_element_id: this.valueMenu.id,
    })
  }
  get validCampos(): any {
    const form = this.formHeader.value;
    if (
       !form.titulo ||
       !form.descripcion) {
      return true;
    } else {
      return false;
    }
  }
  setFechaActual() {
    let date = new Date();
    let fecha =  date.toISOString().split('T')[0];
    let hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const f_h =  fecha + ' ' + hora;
    this.formHeader.patchValue({
      fecha: f_h,
    });
  }
  saveInformtion() {
    const forms = this.formHeader.value;
    const serviceName = END_POINTS.base_back.elements;

    const params = {
      course_id:                forms.course_id,
      element_id:                0,
      topic_id:                 forms.topic_id,
      type_element_id:          forms.type_element_id,
      id_carga_curso_docente:   forms.id_carga_curso_docente,
      id_programa_estudio:      forms.id_programa_estudio,

      grupal:                   '0',
      intentos:                 1,

      titulo:                   forms.titulo,
      descripcion:              forms.descripcion,

      tipo:                     forms.tipo,

      fecha_inicio:             forms.fecha,
      fecha_fin:                forms.fecha,
      fecha_gracia:             forms.fecha,

      // element_id:               forms.element_id,
      visibilidad:              forms.visibilidad === 'S' ? '1' : '0',
      calificable:              forms.calificable  === true ? '1' : '0',
      duracion:                 forms.duracion,
      permitir_comentarios:     forms.permitir_comentarios  === true ? '1' : '0',

      estado:                   forms.estado,
      userid:                   forms.userid || 1,

    };
    // console.log(params);

    if (!this.validCampos) {
      this.loadingsForm.emit(true);
      if (this.code === 'NEW') {
      this.generalServi.addNameData$(serviceName, params).subscribe(r => {
        if (r.success) {
          const valueClose = {
            value_close: 'ok',
            value: params,
            response: r.data,
          }
          this.saveCloseValue.emit(valueClose);
        }
      }, () => { this.loadingsForm.emit(false); }, () => { this.loadingsForm.emit(false); });
    } else {
      this.generalServi.updateNameIdData$(serviceName, this.item.id, params).subscribe(r => {
        if (r.success) {
          const valueClose = {
            value_close: 'ok',
            value: params,
            response: r.data,
          }
          this.saveCloseValue.emit(valueClose);
        }
      }, () => { this.loadingsForm.emit(false); }, () => { this.loadingsForm.emit(false); });
    }
    }
  }
  closeModal() {
    const valueClose = {
      value_close: 'close',
      value: '',
      response: '',
    }
    this.saveCloseValue.emit(valueClose);
  }
  setObjectUpdate() {
    if (this.item) {
          this.formHeader.patchValue({
            titulo:                   this.item.titulo,
            descripcion:              this.item.descripcion,

            fecha:                    this.item.fecha_inicio,
            // element_id:               forms.element_id,
            visibilidad:              this.item.visibilidad === '1' ? 'S' : 'N',
            calificable:              this.item.calificable  === '1' ? true : false,
            duracion:                 this.item.duracion,
            permitir_comentarios2:    this.item.permitir_comentarios  === '1' ? true : false,

            estado:                   this.item.estado,
            userid:                   this.item.userid,

            type_element_id:          this.item.type_element.id,
          });
          const values = {
            calificable:            this.item.calificable,
            duracion:               this.item.duracion,
            visibilidad:            this.item.visibilidad,
            permitir_comentarios:   this.item.permitir_comentarios,
          }
          this.settValuesMore = values;
        }
  }
}
