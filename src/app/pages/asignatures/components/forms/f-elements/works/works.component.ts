import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { DIRECTORY } from 'src/app/shared/directorios/directory';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
})
export class WorksComponent implements OnInit, OnChanges {
  loading: boolean = false;
  formHeader: any = FormGroup;
  options: any = 'N';
  today: any = new Date()
  @Output() saveCloseValue = new EventEmitter<any>();
  @Input() topics: any;
  @Input() unidad: any;
  @Input() curso: any;
  directorio: any = DIRECTORY.courses;
  @Input() item: any;
  @Input() code: any;
  @Input() valueMenu: any;

  @Input() destino: any;
  @Input() type: any;

  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();
  // current = new Date();
  // minDateActual: any = '';
  has_rubric: boolean = false;
  rubrics: any = [];
  min: any = Date;
  settValuesMore: any;
  key_file: any;
  @Input() userInfo: any;
  constructor(
    private formBuilder: FormBuilder,
    private generalServi: GeneralService,
    dateService: NbDateService<Date>,
    public datepipe: DatePipe
  ) {
    let date: any = Date;
    date = dateService.today();
    this.min = dateService.addDay(date, 0);
    // Otra forma
    // const fecha = {
    //   year: this.current.getFullYear(),
    //   month: this.current.getMonth() + 1,
    //   day: this.current.getDate(),
    //   };
    // this.minDateActual = new Date(`${fecha.year}/${fecha.month}/${fecha.day}`);
    // console.log(this.minDateActual);
  }
  ngOnChanges(): void {
    this.userInfo = this.userInfo;
  }
  ngOnInit(): void {
    this.fieldReactive();
    this.getRubricStatus();
  }

  getRubricStatus() {
    const serviceName = 'rubricas/have-rubricas';
    this.loading = true;
    this.generalServi.nameAll$(serviceName).subscribe(
      (res: any) => {
        this.has_rubric = res.data.tiene_rubricas;
        // this.has_rubric = false;
        if (!this.has_rubric) {
          this.formHeader.controls['rubrica'].disable();
          return;
        }
        this.listRubrics();
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  selectedRubrica(rubrica: any) {
    this.formHeader.patchValue({
      rubricas_guia_id: rubrica.id,
    });
  }

  listRubrics() {
    const serviceName = END_POINTS.base_back.rubrics + '/list-guias';
    this.loading = true;
    const params = {
      person_id: this.userInfo?.person?.id,
    };
    this.generalServi.nameParams$(serviceName, params).subscribe(
      r => {
        const data = r.data || [];
        if (data) {
          this.rubrics = data;
        }
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
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

      fecha_inicio: ['', [Validators.required]],
      hora_inicio: [this.today, [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      fecha_gracia: [''],
      hora_gracia: [''],

      tipo: ['TRABAJO', [Validators.required]],

      // element_id: [''],
      visibilidad: ['S'],
      calificable: [true],
      duracion: ['180', [Validators.required]],
      permitir_comentarios: [false],

      estado: ['1', [Validators.required]],
      userid: [''],

      files: [''],
      grupal: [false],
      rubrica: [false],

      rubricas_guia_id: [''],
      // secuencia_aprendizaje: [''],
    };
    this.formHeader = this.formBuilder.group(controls);

    this.key_file = this.userInfo?.person?.codigo;

    if (this.unidad && this.unidad.course_id) {
      this.setValuesPre();
    }
    this.setMenuValues();

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
    // console.log($event);

    this.formHeader.patchValue({
      calificable: $event.calificable,
      duracion: $event.duration || '',
      visibilidad: $event.visibilidad,
      permitir_comentarios: $event.permitir_comentarios,
      // element_id: $event.element_id || '',
    });
  }
  valueFile($event: any) {
    this.formHeader.patchValue({
      files: $event.arrayFile,
    });
    // console.log($event.arrayFile)
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
    if (
      !form.titulo ||
      !form.descripcion ||
      !form.fecha_inicio ||
      !form.fecha_fin ||
      !form.hora_inicio ||
      !form.hora_fin
    ) {
      return true;
    } else {
      return false;
    }
  }

  saveInformtion() {
    const forms = this.formHeader.value;
    if(this.destino === ''){

    }
    const serviceName = END_POINTS.base_back.elements;

    const f_inicio =
      this.datepipe.transform(forms.fecha_inicio, 'yyyy-MM-dd') +
      ' ' +
      this.datepipe.transform(forms.hora_inicio, 'HH:mm');
    const f_fin =
      this.datepipe.transform(forms.fecha_fin, 'yyyy-MM-dd') + ' ' + this.datepipe.transform(forms.hora_fin, 'HH:mm');
    let f_gracia = '';
    if (forms.fecha_gracia) {
      f_gracia =
        this.datepipe.transform(forms.fecha_gracia, 'yyyy-MM-dd') +
        ' ' +
        this.datepipe.transform(forms.hora_gracia, 'HH:mm');
    }
    const params = {
      course_id: forms.course_id,
      element_id: 0,
      topic_id: forms.topic_id,
      type_element_id: forms.type_element_id,
      id_carga_curso_docente: forms.id_carga_curso_docente,
      id_programa_estudio: forms.id_programa_estudio,

      intentos: 1,

      titulo: forms.titulo,
      descripcion: forms.descripcion,

      tipo: forms.tipo,

      fecha_inicio: f_inicio,
      fecha_fin: f_fin,
      fecha_gracia: f_gracia || f_fin,

      grupal: forms.grupal === true ? '1' : '0',
      rubricas_guia_id: forms.rubricas_guia_id,
      // element_id:               forms.element_id,
      visibilidad: forms.visibilidad === 'S' ? '1' : '0',
      calificable: forms.calificable === true ? '1' : '0',
      duracion: forms.duracion,
      permitir_comentarios: forms.permitir_comentarios === true ? '1' : '0',

      estado: forms.estado,
      userid: forms.userid || 1,
      files: forms.files || [],
    };

    // console.log(params, serviceName);

    if (!this.validCampos) {
      this.loadingsForm.emit(true);
      if (this.code === 'NEW') {
        this.generalServi.addNameData$(serviceName, params).subscribe(
          r => {
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
          r => {
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
      const f_h_ini = this.item.fecha_inicio.split(' ');
      const f_h_fin = this.item.fecha_fin.split(' ');
      const f_h_gracia = this.item.fecha_gracia.split(' ');

      const fil: any = [];
      if (this.item.files.length > 0) {
        this.item.files.map((res: any) => {
          const datos: any = {
            ext: res.ext,
            nombre: res.nombre,
            nombre_original: res.nombre_original,
            url: res.url,
            peso: res.peso,
            tipo: res.tipo,
            person_id: res.person_id,
            tabla: res.tabla,
            tabla_id: '',
          };
          fil.push(datos);
        });
      }
      this.formHeader.patchValue({
        titulo: this.item.titulo,
        descripcion: this.item.descripcion,

        // tipo:                     this.item.tipo,

        fecha_inicio: this.renderDate(f_h_ini[0]),
        fecha_fin: this.renderDate(f_h_fin[0]),
        fecha_gracia: this.renderDate(f_h_gracia[0]),
        hora_inicio: this.renderTime(f_h_ini[0], f_h_ini[1]),
        hora_fin: this.renderTime(f_h_fin[0], f_h_fin[1]),
        hora_gracia: this.renderTime(f_h_gracia[0], f_h_gracia[1]),

        grupal: this.item.grupal === '1' ? true : false,
        rubrica: this.item.rubricas_guia_id !== null ? true : false,
        rubricas_guia_id: this.item.rubricas_guia_id,
        // element_id:               forms.element_id,
        visibilidad: this.item.visibilidad === '1' ? 'S' : 'N',
        calificable: this.item.calificable === '1' ? true : false,
        duracion: this.item.duracion,
        permitir_comentarios: this.item.permitir_comentarios === '1' ? true : false,

        estado: this.item.estado,
        userid: this.item.userid,

        type_element_id: this.item.type_element.id,
        files: fil || [],
      });
      const values = {
        calificable: this.item.calificable,
        duracion: this.item.duracion,
        visibilidad: this.item.visibilidad,
        permitir_comentarios: this.item.permitir_comentarios,
      };
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
  renderTime(date: any, time: any) {
    if (date && time) {
      const fecha = date.split('-');
      const f = fecha[0].toString() + '-' + fecha[1].toString() + '-' + fecha[2].toString() + ' ' + time.toString();
      var n = new Date(f);
      if (n) {
        return n;
      } else {
        return '';
      }
    }
    return '';
  }
  getDirectoy() {
    if (this.topics && this.topics?.id_carga_curso_docente) {
      return this.directorio + '/' + this.topics?.id_carga_curso_docente + '/works';
    } else {
      return '';
    }
  }
}
