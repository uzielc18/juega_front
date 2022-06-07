import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { AppService } from 'src/app/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { DIRECTORY } from 'src/app/shared/directorios/directory';
import { CalificarElementEstudentComponent } from '../../../modals/calificar-element-estudent/calificar-element-estudent.component';
import { RequestAperturaComponent } from '../../../modals/request-apertura/request-apertura.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-v-works',
  templateUrl: './v-works.component.html',
  styleUrls: ['./v-works.component.scss'],
})
export class VWorksComponent implements OnInit, OnChanges {
  @Input() element: any;
  @Input() userInfo: any;
  @Input() pending: any;
  @Input() rubrica: any;
  @Input() has_rubric: boolean = false;
  @Input() calification: any;
  loading: boolean = false;
  fechaFin: any;

  daysLeft: any;
  hoursLeft: any;
  minutesLeft: any;
  secondsLeft: any;
  expiredDays: any;
  expiredHours: any;
  expiredMinutes: any;
  expiredSeconds: any;

  tiempo_vencido: boolean = false;
  tiempo_calificado: any;

  form: any = FormGroup;
  daysMap = {
    '=0': '',
    '=1': '1 dia,',
    other: '# dias,',
  };

  hoursMap = {
    '=0': '',
    '=1': '1 hora,',
    other: '# horas,',
  };

  minutesMap = {
    '=0': '',
    '=1': '1 minuto,',
    other: '# minutos,',
  };

  secondsMap = {
    '=0': '.',
    '=1': '1 segundo.',
    other: '# segundos.',
  };
  directorio: any = DIRECTORY.courses;
  arrayFile: any = [];
  @Output() refreshPending: EventEmitter<any> = new EventEmitter();
  key_file: any;
  constructor(
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private appService: AppService,
    private generalServi: GeneralService
  ) {
    
    setInterval(() => {
      if (this.pending) {
        this.countdown(this.pending?.fecha_fin);
      }
    }, 1000);
  }
  // ngOnChanges(): void {
  //   this.pending = this.pending;
  // }
  ngOnInit(): void {
    this.fieldReactive();
    // if (this.rubrica !== null) {
    //   console.log(this.rubrica, 'desde rubriiiiiiiiiiica');
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pending = this.pending;
    if (changes.rubrica) {
      this.rubrica = changes.rubrica.currentValue;
    }
  }

  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    const val = JSON.parse(sesion);
    if (val && val.rol) {
      return val;
    } else {
      return '';
    }
  }
  countdown(fecha_fin: any) {
    const countDate = new Date(fecha_fin).getTime();
    const now = new Date().getTime();
    const left = countDate - now;
    const expired = now - countDate;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    this.daysLeft = Math.floor(left / day);
    this.hoursLeft = Math.floor((left % day) / hour);
    this.minutesLeft = Math.floor((left % hour) / minute);
    this.secondsLeft = Math.floor((left % minute) / second);

    this.expiredDays = Math.floor(expired / day);
    this.expiredHours = Math.floor((expired % day) / hour);
    this.expiredMinutes = Math.floor((expired % hour) / minute);
    this.expiredSeconds = Math.floor((expired % minute) / second);

    if (this.daysLeft <= 0 && this.hoursLeft <= 0 && this.minutesLeft <= 0 && this.secondsLeft <= 0) {
      this.tiempo_vencido = true;
    }
  }

  private fieldReactive() {
    const controls = {
      tipo: ['1'],
      enlace: [''],
      ext_enlace: [''],
    };
    this.form = this.formBuilder.group(controls);
    this.key_file = this.userInfo?.person?.codigo;
    // this.directorio = DIRECTORY.courses + `/${this.element.id_carga_curso_docente}` + '/works';
    // console.log(this.key_file, 'Key file');
  }

  cambioTypo($event: any) {
    this.form.patchValue({
      tipo: $event,
    });
  }
  calificar(element: any) {
    this.dialogService
      .open(CalificarElementEstudentComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          element: element,
          directore: this.getDirectoy(),
          // response: params,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        if (result === 'ok') {
          // this.filtrar();
        }
      });
  }

  valueFile($event: any) {
    const serviceName = END_POINTS.base_back.resourse + '/save-work-student';
    const params: any = {
      files: $event.arrayFile,
    };
    if (params && params.files.length === 1) {
      this.loading = true;
      this.generalServi.addNameIdData$(serviceName, this.pending.student_pending.id, params).subscribe(
        (res: any) => {
          if (res.success) {
            this.arrayFile = [];
            this.refreshPending.emit();
          } else {
            this.arrayFile = [];
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
  }
  saveEnlace() {
    const serviceName = END_POINTS.base_back.resourse + '/save-work-student';
    const form = this.form.value;
    const params: any = {
      ext: form.ext_enlace,
      nombre: form.ext_enlace,
      nombre_original: form.ext_enlace,
      url: form.enlace,
      peso: 0,
      tipo: 'REFERENCIA_TRABAJO',
      person_id: this.appService.user.id,
      tabla: 'pendings',
      tabla_id: '',
    };
    if (params && params.ext && params.nombre && params.person_id) {
      const data = {
        files: [params],
      };
      this.loading = true;
      this.generalServi.addNameIdData$(serviceName, this.pending.student_pending.id, data).subscribe(
        (res: any) => {
          if (res.success) {
            this.fieldReactive();
            this.refreshPending.emit();
          }
        },
        () => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
      // this.lo
    }
  }
  get validButtons() {
    const forms = this.form.value;
    if (!forms.ext_enlace || !forms.enlace || this.pending?.student_pending?.pending_files?.length === 6) {
      return true;
    } else {
      return false;
    }
  }
  deleteFile($event: any) {
    const serviceName = 'files';
    this.loading = true;
    this.generalServi.deleteNameId$(serviceName, $event.id).subscribe(
      (res: any) => {
        if (res.success) {
          this.refreshPending.emit();
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
  getDirectoy() {
    if (this.element && this.element?.id_carga_curso_docente) {
      return this.directorio + '/' + this.element?.id_carga_curso_docente + '/works';
    } else {
      return '';
    }
  }
  justifications() {
    this.dialogService.open(RequestAperturaComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          elemento: this.element,
          pendiente: this.pending,
          rolSemestre: this.rolSemestre,
          userInfo: this.userInfo,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        if (result === 'ok') {
          this.refreshPending.emit();
        }
      });
  }
  deleteJust(just:any) {
    const serviceName = 'justifications'
    Swal.fire({
      title: 'Eliminar',
      text: '¿ Desea eliminar ? ',
      backdrop: true,
      icon: 'question',
      // animation: true,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#7f264a',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      // timer: 2000,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.generalServi.deleteNameId$(serviceName, just.id).subscribe(r => {
            if (r.success) {
              this.refreshPending.emit();
            }
          },() => {this.loading = false;},() => {this.loading = false;});
      }
    });
  }
}
