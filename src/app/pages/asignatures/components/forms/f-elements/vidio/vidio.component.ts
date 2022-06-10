import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-vidio',
  templateUrl: './vidio.component.html',
  styleUrls: ['./vidio.component.scss'],
})
// OnChanges
export class VidioComponent implements OnInit {
  loading: boolean = false;
  formHeader: any = FormGroup;
  options: any = 'N';
  disable: boolean = true;
  @Output() saveCloseValue = new EventEmitter<any>();
  @Input() topics: any;
  @Input() unidad: any;
  @Input() curso: any;

  @Input() item: any;
  @Input() code: any;
  @Input() valueMenu: any;

  @Input() destino: any;
  @Input() type: any = 'ONE';

  directorio: any = 'plantillas/upeu';

  listIcons: any = [
    {
      checked: false,
      name: 'YouTube',
      value: 'YOUTUBE',
      link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/YouTube_social_white_squircle.svg/800px-YouTube_social_white_squircle.svg.png',
      id: 1,
    },
    {
      checked: false,
      name: 'Loom',
      value: 'LOOM',
      link: 'https://www.softwareflavor.com/images/8c/8c9f868b431b37a964c5269cef2878b7.png',
      id: 2,
    },
    {
      checked: false,
      name: 'Vimeo',
      value: 'VIMEO',
      link: 'https://w7.pngwing.com/pngs/805/486/png-transparent-vimeo-youtube-logo-computer-icons-youtube-blue-text-trademark.png',
      id: 3,
    },
    {
      checked: false,
      name: 'Facebook',
      value: 'FACEBOOK',
      link: 'https://www.centroveterinarioalbayda.com/wp-content/uploads/2015/01/facebook-veterinaria.png',
      id: 4,
    },
  ];
  settValuesMore: any;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();
  constructor(private formBuilder: FormBuilder, private generalServi: GeneralService, public datepipe: DatePipe) {}

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

      url_externa: ['', [Validators.required]],
      tamano_peso: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fecha: [this.topics.fecha_tema || ''],

      tipo: ['VIDEO', [Validators.required]],

      visibilidad: ['S'],
      calificable: [false],
      duracion: ['180', [Validators.required]],
      permitir_comentarios: [false],

      estado: ['1', [Validators.required]],
      userid: [''],

      // files: [''],
    };
    this.formHeader = this.formBuilder.group(controls);
    if (this.unidad && this.unidad.course_id) {
      this.setValuesPre();
    }
    this.setMenuValues();
    // this.setFechaActual();
    if (this.code === 'UPDATE') {
      this.setObjectUpdate();
    }
  }
  setValuesPre() {
    this.formHeader.patchValue({
      course_id: this.unidad.course_id || '',
      topic_id: this.topics.id || '',
      id_carga_curso_docente: this.topics.id_carga_curso_docente || '',
      id_programa_estudio: this.curso.programa_estudio_id || '',
    });
  }
  formsValues($event: any) {
    this.formHeader.patchValue({
      calificable: $event.calificable,
      duracion: $event.duration || '',
      visibilidad: $event.visibilidad,
      permitir_comentarios: $event.permitir_comentarios,
    });
  }
  // valueFile($event:any){
  //   this.formHeader.patchValue({
  //     files: $event.arrayFile,
  //   });
  // }

  valueButtom(item: any) {
    this.listIcons.forEach((element: any) => {
      element.checked = false;
    });
    item.checked = true;
    this.formHeader.controls['tamano_peso'].setValue(item.name);
  }
  moreOptions(value: any) {
    if (value === 'N') {
      this.options = 'S';
    } else {
      this.options = 'N';
    }
  }
  setMenuValues() {
    this.formHeader.patchValue({
      type_element_id: this.valueMenu.id,
    });
  }
  get validCampos(): any {
    const form = this.formHeader.value;
    if (!form.url_externa || !form.tamano_peso || !form.titulo || !form.descripcion) {
      return true;
    } else {
      return false;
    }
  }
  procesar() {
    this.disable = true;
    const serviceName = END_POINTS.base_back.config + '/meta';
    if (this.formHeader.value.url_externa) {
      const params = {
        url: this.formHeader.value.url_externa,
      };

      this.loadingsForm.emit(true);
      this.generalServi.addNameData$(serviceName, params).subscribe(
        (r) => {
          if (r.success) {
            const data = r.data;
            this.vaciarCamps();
            this.formHeader.patchValue({
              titulo: data.title || data['twitter:title'] || '',
              descripcion: data.description || '',
              tamano_peso: data['twitter:app:name:googleplay'] || '',
            });
            if (data['twitter:app:name:googleplay']) {
              this.listIcons.map((r: any) => {
                if (r.name === data['twitter:app:name:googleplay']) {
                  r.checked = true;
                }
              });
            } else {
              this.disable = false;
            }
          }
        },
        () => {
          this.loadingsForm.emit(false);
        },
        () => {
          this.loadingsForm.emit(false);
        }
      );
    }
  }

  vaciarCamps() {
    this.formHeader.patchValue({
      tamano_peso: '',
      titulo: '',
      descripcion: '',
    });
    this.listIcons.map((r: any) => {
      r.checked = false;
    });
    this.disable = true;
  }

  valueLink() {
    if (!this.formHeader.value.url_externa) {
      this.vaciarCamps();
    }
  }
  recopilaKeyVideo(url: any, tamanoPeso: any) {
    let idKeyVideo = '';
    switch (tamanoPeso) {
      case 'YouTube':
        const re: any =
          /^(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;
        const you = url.match(re)[7];
        idKeyVideo = you;
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
  // setFechaActual() {
  //   let date = new Date();
  //   let fecha = date.toISOString().split('T')[0];
  //   let hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  //   const f_h = fecha + ' ' + hora;
  //   this.formHeader.patchValue({
  //     fecha: f_h,
  //   });
  // }

  saveInformtion() {
    const forms = this.formHeader.value;
    if (this.code === 'NEW' && this.type === 'MANY') {
      const params = {
        course_id: forms.course_id,
        element_id: 0,
        topic_id: forms.topic_id,
        type_element_id: forms.type_element_id,
        id_carga_curso_docente: forms.id_carga_curso_docente,
        id_programa_estudio: forms.id_programa_estudio,

        grupal: '0',
        intentos: 1,

        url_externa: forms.url_externa,
        tamano_peso: forms.tamano_peso,
        titulo: forms.titulo,
        descripcion: forms.descripcion,
        key_video: this.recopilaKeyVideo(forms.url_externa, forms.tamano_peso),

        tipo: forms.tipo,

        fecha_inicio: forms.fecha,
        fecha_fin: forms.fecha,
        fecha_gracia: forms.fecha,

        // element_id:               forms.element_id,
        visibilidad: forms.visibilidad === 'S' ? '1' : '0',
        calificable: forms.calificable === true ? '1' : '0',
        duracion: forms.duracion,
        permitir_comentarios: forms.permitir_comentarios === true ? '1' : '0',

        estado: forms.estado,
        userid: 1,

        files: [],

        destino: this.destino,
      };
      // console.log(params, 'muchossss');
      const serviceName = END_POINTS.base_back.default + '.........';
      if (!this.validCampos) {
        // this.generalServi.
      }
    }

    if (this.type === 'ONE') {
      const params = {
        course_id: forms.course_id,
        element_id: 0,
        topic_id: forms.topic_id,
        type_element_id: forms.type_element_id,
        id_carga_curso_docente: forms.id_carga_curso_docente,
        id_programa_estudio: forms.id_programa_estudio,

        grupal: '0',
        intentos: 1,

        url_externa: forms.url_externa,
        tamano_peso: forms.tamano_peso,
        titulo: forms.titulo,
        descripcion: forms.descripcion,
        key_video: this.recopilaKeyVideo(forms.url_externa, forms.tamano_peso),

        tipo: forms.tipo,

        fecha_inicio: forms.fecha,
        fecha_fin: forms.fecha,
        fecha_gracia: forms.fecha,

        // element_id:               forms.element_id,
        visibilidad: forms.visibilidad === 'S' ? '1' : '0',
        calificable: forms.calificable === true ? '1' : '0',
        duracion: forms.duracion,
        permitir_comentarios: forms.permitir_comentarios === true ? '1' : '0',

        estado: forms.estado,
        userid: 1,

        files: [],
      };
      const serviceName = END_POINTS.base_back.elements;
      if (!this.validCampos) {
        this.loadingsForm.emit(true);
        if (this.code === 'NEW') {
          this.generalServi.addNameData$(serviceName, params).subscribe(
            (r) => {
              if (r.success) {
                const valueClose = {
                  value_close: 'ok',
                  value: params,
                  response: r.data,
                  type_element: this.valueMenu,
                };
                this.saveCloseValue.emit(valueClose);
              }
            },
            () => {
              this.loadingsForm.emit(false);
            },
            () => {
              this.loadingsForm.emit(false);
            }
          );
        } else {
          this.generalServi.updateNameIdData$(serviceName, this.item.id, params).subscribe(
            (r) => {
              if (r.success) {
                const valueClose = {
                  value_close: 'ok',
                  value: params,
                  response: r.data,
                  type_element: this.valueMenu,
                };
                this.saveCloseValue.emit(valueClose);
              }
            },
            () => {
              this.loadingsForm.emit(false);
            },
            () => {
              this.loadingsForm.emit(false);
            }
          );
        }
      }
    }
  }
  closeModal() {
    const valueClose = {
      value_close: 'close',
      value: '',
      response: '',
      type_element: '',
    };
    this.saveCloseValue.emit(valueClose);
  }
  setObjectUpdate() {
    if (this.item) {
      this.formHeader.patchValue({
        titulo: this.item.titulo,
        descripcion: this.item.descripcion,

        url_externa: this.item.url_externa,
        tamano_peso: this.item.tamano_peso,

        fecha: this.item.fecha_inicio,
        // element_id:               forms.element_id,
        visibilidad: this.item.visibilidad === '1' ? 'S' : 'N',
        calificable: this.item.calificable === '1' ? true : false,
        duracion: this.item.duracion,
        permitir_comentarios2: this.item.permitir_comentarios === '1' ? true : false,

        estado: this.item.estado,
        userid: this.item.userid,

        type_element_id: this.item.type_element.id,
      });
      const values = {
        calificable: this.item.calificable,
        duracion: this.item.duracion,
        visibilidad: this.item.visibilidad,
        permitir_comentarios: this.item.permitir_comentarios,
      };
      this.settValuesMore = values;
      this.recorreTamanoPeso();
    }
  }
  recorreTamanoPeso() {
    this.listIcons.map((re: any) => {
      if (re.name === this.item.tamano_peso) {
        re.checked = true;
      }
    });
  }
}
