import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  constructor(private formBuilder: FormBuilder, private generalServi: GeneralService) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      course_id: ['', [Validators.required]],
      element_id: [0, [Validators.required]],
      topic_id: ['', [Validators.required]],
      type_element_id: ['', [Validators.required]],
      evaluation_id: ['', [Validators.required]],
      id_carga_curso_docente: ['', [Validators.required]],
      id_programa_estudio: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipo: ['TRABAJO', [Validators.required]],
      orden: ['', [Validators.required]],
      nota: ['', [Validators.required]],
      url_externa: ['', [Validators.required]],
      documento_ayuda: ['', [Validators.required]],
      tamano_peso: ['', [Validators.required]],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      fecha_gracia: ['', [Validators.required]],
      grupal: ['', [Validators.required]],
      visibilidad: ['', [Validators.required]],
      intentos: ['', [Validators.required]],
      calificable: ['', [Validators.required]],
      duracion: ['', [Validators.required]],
      estado: ['1', [Validators.required]],
      userid: ['', [Validators.required]],
      files: [''],
    };
    this.formHeader = this.formBuilder.group(controls);
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
  formsValues($event:any) {
    this.formHeader.patchValue({
      calificable: $event.calificable,
      duracion: $event.duracion,
      visibilidad: $event.visibilidad,
      active_chat: $event.active_chat,
      carpeta: $event.calificable,
    })
  }
  saveInformtion() {
    const forms = this.formHeader.value;
    const serviceName = END_POINTS.base_back + '/elements';
    const params = {
      course_id:                forms.course_id,
      element_id:               forms.element_id,
      topic_id:                 forms.topic_id,
      type_element_id:          forms.type_element_id,
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
      fecha_inicio:             forms.fecha_inicio,
      fecha_fin:                forms.fecha_fin,
      fecha_gracia:             forms.fecha_gracia,
      grupal:                   forms.grupal,
      visibilidad:              forms.visibilidad,
      intentos:                 forms.intentos,
      calificable:              forms.calificable,
      duracion:                 forms.duracion,
      estado:                   forms.estado,
      userid:                   forms.userid,
      files:                    forms.files,
    };
    if (this.formHeader.valid) {
      this.generalServi.addNameData$(serviceName, params).subscribe(r => {
        if (r.success) {
          this.saveCloseValue.emit('ok');
        }
      });
    }
  }
  closeModal() {
    this.saveCloseValue.emit('close');
  }
}
