import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit {
  loading: boolean = false;
  formHeader: any = FormGroup;
  options: any = 'N';
  @Output() saveCloseValue = new EventEmitter<any>();
  @Input() topics: any;
  @Input() unidad: any;
  @Input() curso: any;
  directorio: any = 'plantillas/upeu';
  constructor(private formBuilder: FormBuilder, private generalServi: GeneralService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      course_id: ['', [Validators.required]],
      element_id: [''],
      topic_id: ['', [Validators.required]],
      type_element_id: [1, [Validators.required]],
      evaluation_id: [''],
      id_carga_curso_docente: ['', [Validators.required]],
      id_programa_estudio: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipo: ['TRABAJO', [Validators.required]],
      orden: [''],
      nota: [''],
      url_externa: [''],
      documento_ayuda: [''],
      tamano_peso: [''],
      fecha_inicio: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      fecha_gracia: ['', [Validators.required]],
      hora_gracia: ['', [Validators.required]],
      grupal: [false],
      visibilidad: [false],
      intentos: [''],
      calificable: [true],
      duracion: ['180', [Validators.required]],
      estado: ['1', [Validators.required]],
      userid: [''],
      files: [''],

      rubrica: [false],
      id_rubrica: [''],
      secuencia_aprendizaje: [''],

    };
    this.formHeader = this.formBuilder.group(controls);
    this.setValuesPre();
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
    console.log($event, 'formsValue');

    this.formHeader.patchValue({
      calificable: $event.calificable,
      duracion: $event.duration || '',
      visibilidad: $event.visibilidad,
      // active_chat: $event.active_chat,
      element_id: $event.element_id || '',
    })
  }
  valueFile($event:any){
    this.formHeader.patchValue({
      files: $event.arrayFile,
    });
  }
  moreOptions(value:any){
    if (value === 'N') {
      this.options = 'S';
    } else {
      this.options = 'N';
    }
  }

  saveInformtion() {
    const forms = this.formHeader.value;
    const serviceName = END_POINTS.base_back.resourse + '/elements';
    const f_inicio = this.datepipe.transform(forms.fecha_inicio, 'yyyy-MM-dd') + ' ' + this.datepipe.transform(forms.hora_inicio, 'HH:mm');
    const f_fin = this.datepipe.transform(forms.fecha_fin, 'yyyy-MM-dd') + ' ' + this.datepipe.transform(forms.hora_fin, 'HH:mm');
    const f_gracia = this.datepipe.transform(forms.fecha_gracia, 'yyyy-MM-dd') + ' ' + this.datepipe.transform(forms.hora_gracia, 'HH:mm');
    const params = {
      course_id:                forms.course_id,
      element_id:               forms.element_id,
      topic_id:                 forms.topic_id,
      type_element_id:          1,
      evaluation_id:            forms.evaluation_id,
      id_carga_curso_docente:   forms.id_carga_curso_docente,
      id_programa_estudio:      forms.id_programa_estudio,
      titulo:                   forms.titulo,
      descripcion:              forms.descripcion,
      tipo:                     forms.tipo,
      orden:                    forms.orden,
      nota:                     forms.nota,
      url_externa:              forms.url_externa,
      documento_ayuda:          forms.documento_ayuda,
      tamano_peso:              forms.tamano_peso,
      fecha_inicio:             f_inicio,
      fecha_fin:                f_fin,
      fecha_gracia:             f_gracia,
      grupal:                   forms.grupal === true ? '1' : '0',
      visibilidad:              forms.visibilidad === true ? '1' : '0',
      intentos:                 forms.intentos,
      calificable:              forms.calificable  === true ? '1' : '0',
      duracion:                 forms.duracion,
      estado:                   forms.estado,
      userid:                   forms.userid,
      files:                    forms.files,
    };
    // console.log(params, serviceName);

    if (this.formHeader.valid) {
      this.loading = true;
      this.generalServi.addNameData$(serviceName, params).subscribe(r => {
        if (r.success) {
          this.saveCloseValue.emit('ok');
        }
      }, () => { this.loading = false; }, () => { this.loading = false; });
    }
  }
  closeModal() {
    this.saveCloseValue.emit('close');
  }
}
