import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-vidio',
  templateUrl: './vidio.component.html',
  styleUrls: ['./vidio.component.scss']
})
// OnChanges
export class VidioComponent implements OnInit {
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
  directorio: any = 'plantillas/upeu';

  listIcons:any = [
    {
      checked: false,
      name: 'YouTube',
      value: 'YOUTUBE',
      link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/YouTube_social_white_squircle.svg/800px-YouTube_social_white_squircle.svg.png',
      id: 1
    },
    {
      checked: false,
      name: 'Loom',
      value: 'LOOM',
      link: 'https://www.softwareflavor.com/images/8c/8c9f868b431b37a964c5269cef2878b7.png',
      id: 2
    },
    {
      checked: false,
      name: 'Vimeo',
      value: 'VIMEO',
      link: 'https://w7.pngwing.com/pngs/805/486/png-transparent-vimeo-youtube-logo-computer-icons-youtube-blue-text-trademark.png',
      id: 3
    },
    {
      checked: false,
      name: 'Fecebook',
      value: 'FECEBOOK',
      link: 'https://www.centroveterinarioalbayda.com/wp-content/uploads/2015/01/facebook-veterinaria.png',
      id: 4
    },
]
@Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();
  constructor(private formBuilder: FormBuilder, private generalServi: GeneralService,
    public datepipe: DatePipe) { }

  // ngOnChanges() {
  //   console.log(this.valueMenu, 'llegueeeee');
  // }
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

      url_externo: ['', [Validators.required]],
      tamano_peso: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],

      fecha_inicio: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      // fecha_gracia: ['', [Validators.required]],
      // hora_gracia: ['', [Validators.required]],

      tipo: ['VIDEO', [Validators.required]],

      element_id: [''],
      visibilidad: ['S'],
      calificable: [true],
      duracion: ['180', [Validators.required]],
      permitir_comentarios: [false],

      estado: ['1', [Validators.required]],
      userid: [''],

      files: [''],

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
  valueFile($event:any){
    this.formHeader.patchValue({
      files: $event.arrayFile,
    });
  }

  valueButtom(item:any) {
    this.listIcons.forEach((element:any) => {
      element.checked = false;
    });
    item.checked = true;
    this.formHeader.controls['tamano_peso'].setValue(item.value);
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
       !form.url_externo ||
       !form.tamano_peso ||
       !form.titulo ||
       !form.descripcion ||
       !form.fecha_inicio ||
       !form.fecha_fin ||
      //  !form.fecha_gracia ||
       !form.hora_inicio ||
       !form.hora_fin
       ) {
      return true;
    } else {
      return false;
    }
  }
  procesar() {
    const serviceName = END_POINTS.base_back.config + '/meta';
    if (this.formHeader.value.url_externo) {
      const params = {
        url: this.formHeader.value.url_externo,
      };

      this.loadingsForm.emit(true);
      this.generalServi.addNameData$(serviceName, params).subscribe(r => {
        if (r.success) {
          const data = r.data;
          this.vaciarCamps();
          this.formHeader.patchValue({
            titulo: data.title || data['twitter:title'] || '',
            descripcion: data.description || '',
            tamano_peso: data['twitter:app:name:googleplay'] || '',
          });
          if (data['twitter:app:name:googleplay']) {
            this.listIcons.map((r:any) => {
              if (r.name === data['twitter:app:name:googleplay']) {
                r.checked = true;
              }
            });
          }

        }

      }, () => { this.loadingsForm.emit(false); }, () => { this.loadingsForm.emit(false); });
    }
  }

  vaciarCamps() {
    this.formHeader.patchValue({
      tamano_peso: '',
      titulo: '',
      descripcion: '',
      key_video: '',
    });
    this.listIcons.map((r:any) => {
        r.checked = false;
    });
  }

  valueLink() {
    if (!this.formHeader.value.url_externo) {
      this.vaciarCamps();
    }
  }
  recopilaKeyVideo(url:any, tamanoPeso: any) {
    console.log(url, tamanoPeso);

    let idKeyVideo = '';
    switch (tamanoPeso) {
      case 'YouTube':
        const re:any = /^(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;
        const you = url.match(re)[7];
        idKeyVideo = you;
        console.log(idKeyVideo);

        break;
      case 'Vimeo':
        const a = /(videos|video|channels|\.com)\/([\d]+)/;
        const vim = url.match(a)[2];
        idKeyVideo = vim;
        break;
      case 'Loom':

        break;
      case 'Facebook':

        break;
      default:

        break;
    }
    return idKeyVideo;
  }

  saveInformtion() {
    const forms = this.formHeader.value;
    const serviceName = END_POINTS.base_back.elements;

    const f_inicio = this.datepipe.transform(forms.fecha_inicio, 'yyyy-MM-dd') + ' ' + this.datepipe.transform(forms.hora_inicio, 'HH:mm');
    const f_fin = this.datepipe.transform(forms.fecha_fin, 'yyyy-MM-dd') + ' ' + this.datepipe.transform(forms.hora_fin, 'HH:mm');
    // const f_gracia = this.datepipe.transform(forms.fecha_gracia, 'yyyy-MM-dd') + ' ' + this.datepipe.transform(forms.hora_gracia, 'HH:mm');
    const params = {
      course_id:                forms.course_id,
      element_id:                0,
      topic_id:                 forms.topic_id,
      type_element_id:          forms.type_element_id,
      id_carga_curso_docente:   forms.id_carga_curso_docente,
      id_programa_estudio:      forms.id_programa_estudio,

      grupal:                   '0',
      intentos:                 1,

      url_externo:              forms.url_externo,
      tamano_peso:              forms.tamano_peso,
      titulo:                   forms.titulo,
      descripcion:              forms.descripcion,
      key_video:                this.recopilaKeyVideo(forms.url_externo, forms.tamano_peso),

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

      files:                    forms.files || [],
    };
    if (!this.validCampos) {
      this.loadingsForm.emit(true);
      this.generalServi.addNameData$(serviceName, params).subscribe(r => {
        if (r.success) {
          const valueClose = {
            value_close: 'ok',
            value: params,
          }
          this.saveCloseValue.emit(valueClose);
        }
      }, () => { this.loadingsForm.emit(false); }, () => { this.loadingsForm.emit(false); });
    }
  }
  closeModal() {
    const valueClose = {
      value_close: 'close',
      value: '',
    }
    this.saveCloseValue.emit(valueClose);
  }
}
