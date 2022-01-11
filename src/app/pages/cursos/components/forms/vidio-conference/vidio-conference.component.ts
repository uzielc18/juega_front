import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vidio-conference',
  templateUrl: './vidio-conference.component.html',
  styleUrls: ['./vidio-conference.component.scss']
})
export class VidioConferenceComponent implements OnInit {
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
  listIcons:any = [
    {
      checked: false,
      name: 'Meet',
      value: 'MEET',
      link: 'https://canalti.pe/wp-content/uploads/2020/05/Google_Hangouts_Meet_icon.png',
      id: 1
    },
    {
      checked: false,
      name: 'Zoom',
      value: 'ZOOM',
      link: 'http://assets.stickpng.com/images/5e8ce318664eae0004085461.png',
      id: 2
    },
    {
      checked: false,
      name: 'Jitsi Meet',
      value: 'JITSI MEET',
      link: 'https://www.escueladetelematicapnp.edu.pe/wp-content/uploads/2020/04/jitsi-512x512-1-e1586337226986.png',
      id: 3
    },
]
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
      type_element_id: ['', [Validators.required]],
      id_carga_curso_docente: ['', [Validators.required]],
      id_programa_estudio: ['', [Validators.required]],

      tamano_peso: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],

      fecha_inicio: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],

      tipo: ['VIDEO_CONFERENCIA', [Validators.required]],

      element_id: [''],
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
      element_id: $event.element_id || '',
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
    if (!form.tamano_peso ||
       !form.titulo ||
       !form.descripcion ||
       !form.fecha_inicio ||
       !form.hora_inicio ||
       !form.hora_fin) {
      return true;
    } else {
      return false;
    }
  }
  valueButtom(item:any) {
    this.listIcons.forEach((element:any) => {
      element.checked = false;
    });
    item.checked = true;
    this.formHeader.controls['tamano_peso'].setValue(item.value);
  }

  saveInformtion() {
    const forms = this.formHeader.value;
    const serviceName = END_POINTS.base_back.elements;

    const hinicio:any = this.datepipe.transform(forms.hora_inicio, 'HH:mm');
    const hfin:any = this.datepipe.transform(forms.hora_fin, 'HH:mm');
    const validHora = (hinicio > hfin) ? false : true;
    if (validHora) {
      const f_inicio = this.datepipe.transform(forms.fecha_inicio, 'yyyy-MM-dd') + ' ' + hinicio;
      const f_fin = this.datepipe.transform(forms.fecha_inicio, 'yyyy-MM-dd') + ' ' + hfin;
      const params = {
        course_id:                forms.course_id,
        element_id:                0,
        topic_id:                 forms.topic_id,
        type_element_id:          forms.type_element_id,
        id_carga_curso_docente:   forms.id_carga_curso_docente,
        id_programa_estudio:      forms.id_programa_estudio,

        grupal:                   '0',
        intentos:                 1,

        tamano_peso:              forms.tamano_peso,
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
        userid:                   1,
      };
      // console.log(params, serviceName);

      if (!this.validCampos) {
        this.loadingsForm.emit(true);
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
      }
    } else {
      Swal.fire({
        title: 'Recuerda',
        text: 'La hora fin no puede ser menor a la hora inicio',
        backdrop: true,
        // animation: true,
        icon: 'warning',
        showCloseButton: true,
        // showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Ok'
        // timer: 2000,
      })
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
}
