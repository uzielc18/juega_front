import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.scss']
})
export class EvaluationsComponent implements OnInit {
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

  @Input() destino: any;

  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();
  min: any = Date;
  settValuesMore:any;
  constructor(private formBuilder: FormBuilder, private generalServi: GeneralService, dateService: NbDateService<Date>,
    public datepipe: DatePipe) {
      let date:any = Date;
      date = dateService.today();
      this.min = dateService.addDay(date, 0);
    }

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
      // pregunta: ['', [Validators.required]],

      fecha_inicio: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],

      tipo: ['EVALUACION', [Validators.required]],

      visibilidad: ['N'],
      calificable: [false],
      duracion: ['180', [Validators.required]],
      permitir_comentarios: [false],

      aleatorio:  [0],
      paginado:    ['none'],
      mostrar_respuestas:   ['No'],

      estado: ['1', [Validators.required]],
      userid: [''],

    };
    this.formHeader = this.formBuilder.group(controls);
    if (this.unidad && this.unidad.course_id) {
      this.setValuesPre();
    }
    this.setMenuValues();
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
    console.log($event)
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
    let v: boolean = false
    const fechaFin = new Date(form.fecha_fin).getTime()
    const fechaGracia = new Date(form.fecha_gracia).getTime()
    if(fechaFin > fechaGracia){
      v = true
    }
    if (
       !form.titulo ||
       !form.descripcion ||
       !form.fecha_inicio ||
       !form.fecha_fin ||
       !form.hora_inicio ||
       !form.hora_fin||
        v === true) {
      return true;
    } else {
      return false;
    }
  }
  saveInformtion() {
    const forms = this.formHeader.value;
    const serviceName = END_POINTS.base_back.elements;

    const f_inicio = this.datepipe.transform(forms.fecha_inicio, 'yyyy-MM-dd') + ' ' + this.datepipe.transform(forms.hora_inicio, 'HH:mm');
    const f_fin = this.datepipe.transform(forms.fecha_fin, 'yyyy-MM-dd') + ' ' + this.datepipe.transform(forms.hora_fin, 'HH:mm');
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

      fecha_inicio:             f_inicio,
      fecha_fin:                f_fin,
      fecha_gracia:             f_fin,

      // element_id:               forms.element_id,
      visibilidad:              forms.visibilidad === 'S' ? '1' : '0',
      calificable:              forms.calificable  === true ? '1' : '0',
      duracion:                 forms.duracion,
      permitir_comentarios:     forms.permitir_comentarios  === true ? '1' : '0',

      estado:                   forms.estado,
      userid:                   forms.userid || 1,

      evaluacion: {
        aleatorio:              forms.aleatorio,
        paginado:               forms.paginado,
        mostrar_respuestas:     forms.mostrar_respuestas,

      }
    };
    if (!this.validCampos) {
      this.loadingsForm.emit(true);
      if (this.code === 'NEW') {
      this.generalServi.addNameData$(serviceName, params).subscribe(r => {
        if (r.success) {
          const valueClose = {
            value_close: 'ok',
            value: params,
            response: r.data,
            type_element: this.valueMenu,
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
            type_element: this.valueMenu,
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
      type_element: '',
    }
    this.saveCloseValue.emit(valueClose);
  }
  setObjectUpdate() {
    if (this.item) {
          const f_h_ini = this.item.fecha_inicio.split(' ');
          const f_h_fin = this.item.fecha_fin.split(' ');
          // const f_h_gracia = this.item.fecha_gracia.split(' ');

          this.formHeader.patchValue({

            titulo:                   this.item.titulo,
            descripcion:              this.item.descripcion,

            // pregunta:                 this.item.forums.pregunta || '',

            fecha_inicio:             this.renderDate(f_h_ini[0]),
            fecha_fin:                this.renderDate(f_h_fin[0]),
            hora_inicio:              this.renderTime(f_h_ini[0], f_h_ini[1]),
            hora_fin:                 this.renderTime(f_h_fin[0], f_h_fin[1]),

            // element_id:               forms.element_id,
            visibilidad:              this.item.visibilidad === '1' ? 'S' : 'N',
            calificable:              this.item.calificable  === '1' ? true : false,
            duracion:                 this.item.duracion,
            permitir_comentarios2:    this.item.permitir_comentarios  === '1' ? true : false,

            aleatorio:                this.item.aleatorio,
            paginado:                 this.item.paginado,
            mostrar_respuestas:       this.item.mostrar_respuestas,

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
  renderDate(date: any) {
    if (date) {
      const fecha = date.split('-');
      var n = new Date(`${fecha[0]}-${fecha[1]}-${fecha[2]}`);
      n.setMinutes(n.getMinutes() + n.getTimezoneOffset()); //para solucionar la diferencia de minutos
      if (n.getDate()) {
        return n;
      } else {
        return '';
      }
    }
    return '';
  }
  renderTime(date: any, time:any) {
    if (date && time) {
      const fecha = date.split('-');
      const f = (fecha[0]).toString() + '-' + (fecha[1]).toString() + '-' + (fecha[2]).toString() + ' ' + time.toString();
      var n = new Date(f);
      if (n) {
        return n;
      } else {
        return '';
      }
    }
    return '';
  }
}
