import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  loading: boolean = false;
  formHeader: any = FormGroup;
  options: any = 'N';
  @Output() saveCloseValue = new EventEmitter<any>();
  @Input() topics: any;
  @Input() unidad: any;
  @Input() curso: any;
  directorio: any = 'plantillas/upeu';

  @Input() item: any;
  @Input() code: any;
  @Input() valueMenu: any;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();
  constructor(private formBuilder: FormBuilder, private generalServi: GeneralService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      course_id: ['', [Validators.required]],
      topic_id: ['', [Validators.required]],
      type_element_id: ['5', [Validators.required]],
      id_carga_curso_docente: ['', [Validators.required]],
      id_programa_estudio: ['', [Validators.required]],

      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],

      fecha_inicio: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      fecha_gracia: ['', [Validators.required]],
      hora_gracia: ['', [Validators.required]],

      tipo: ['DOCUMENTO', [Validators.required]],

      element_id: [''],
      visibilidad: ['S'],
      calificable: [true],
      duracion: ['180', [Validators.required]],

      estado: ['1', [Validators.required]],
      userid: [''],

      files: [''],

    };
    this.formHeader = this.formBuilder.group(controls);
    this.setValuesPre();
    // this.setMenuValues();
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
  // setMenuValues() {
  //   this.formHeader.patchValue({
  //     type_element_id: this.valueMenu.type_element_id,
  //   })
  // }
  get validCampos(): any {
    const form = this.formHeader.value;
    if (
       !form.titulo ||
       !form.descripcion ||
       !form.fecha_inicio ||
       !form.fecha_fin ||
       !form.fecha_gracia ||
       !form.hora_inicio ||
       !form.hora_fin ||
       !form.hora_gracia
       ) {
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
    const f_gracia = this.datepipe.transform(forms.fecha_gracia, 'yyyy-MM-dd') + ' ' + this.datepipe.transform(forms.hora_gracia, 'HH:mm');
    const params = {
      course_id:                forms.course_id,
      element_id:                0,
      topic_id:                 forms.topic_id,
      type_element_id:          forms.type_element_id,
      id_carga_curso_docente:   forms.id_carga_curso_docente,
      id_programa_estudio:      forms.id_programa_estudio,

      grupal:                   0,
      intentos:                 1,

      titulo:                   forms.titulo,
      descripcion:              forms.descripcion,

      tipo:                     forms.tipo,

      fecha_inicio:             f_inicio,
      fecha_fin:                f_fin,
      fecha_gracia:             f_gracia,

      // element_id:               forms.element_id,
      visibilidad:              forms.visibilidad === 'S' ? '1' : '0',
      calificable:              forms.calificable  === true ? '1' : '0',
      duracion:                 forms.duracion,

      estado:                   forms.estado,
      userid:                   1,

      files:                    forms.files || [],
    };
    if (!this.validCampos) {
      this.loadingsForm.emit(true);
      this.generalServi.addNameData$(serviceName, params).subscribe(r => {
        if (r.success) {
          this.saveCloseValue.emit('ok');
        }
      }, () => { this.loadingsForm.emit(false); }, () => { this.loadingsForm.emit(false); });
    }
  }
  closeModal() {
    this.saveCloseValue.emit('close');
  }
}
