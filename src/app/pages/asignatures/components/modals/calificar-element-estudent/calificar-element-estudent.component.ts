import { DatePipe } from '@angular/common';
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbComponentStatus, NbDialogRef, NbToastrService } from '@nebular/theme';
import { AppService } from 'src/app/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { CForumsComponent } from '../../c-free/calificar-elements/c-forums/c-forums.component';
import {VExamViewsComponent} from "../../../../../shared/components/exam-view/v-exam-views/v-exam-views.component";

@Component({
  selector: 'app-calificar-element-estudent',
  templateUrl: './calificar-element-estudent.component.html',
  styleUrls: ['./calificar-element-estudent.component.scss'],
})
export class CalificarElementEstudentComponent implements OnInit, AfterViewInit{
  loading:boolean = false;
  @Input() element:any;
  @Input() rol:any;
  @Input() directore:any;
  @ViewChild(VExamViewsComponent) child: any;
  noteQuestion: any;
  listAlumns:any = [];
  formHeader: any = FormGroup;
  notesState: boolean = false;
  pending: any;
  has_rubric: boolean = false;
  rubrica: any;
  listRubric: any[] = [];
  listRubricMod: any[] = [];
  colors: any[] = ['#57884e', '#8ba642', '#f9c851', '#f9a65a', '#f97a5a', '#f94a5a', '#f9065a'];
  bgColors: any[] = ['#57884e20', '#8ba64220', '#f9c85120', '#f9a65a20', '#f97a5a20', '#f94a5a20', '#f9065a20'];
  formDate: any = FormGroup;
  headStudent: any;
  totalAlumnos: any = [];
  datosStudent: any;
  public searchableList: any[] = [];
  public queryString: any;
  userInfo: any;
  listResponses: any = [];
  infor: any = '';
  timeActual:any = '';
  constructor(
    public activeModal: NbDialogRef<CalificarElementEstudentComponent>,
    private formBuilder: FormBuilder,
    private generalServi: GeneralService,
    private userService: AppService,
    private datepipe: DatePipe,
    private toastrService: NbToastrService
  ) {
    this.searchableList = ['nombres', 'apellido_paterno', 'apellido_materno'];
    this.timeActual = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }

  ngOnInit(): void {
    this.has_rubric = this.element.rubricas_guia_id !== null ? true : false;
    this.fieldReactive();
    this.filedMoreDate();
    this.getListEstudent();
    // console.log(this.formHeader.value);
  }
  ngAfterViewInit() {
    this.noteQuestion = this.child?.info;
  }
  private fieldReactive() {
    const controls = {
      ver_trabajo: ['N'],
      comentario: [''],
      nota: [0, [Validators.required, Validators.maxLength(2), Validators.max(20)]],
    };
    this.formHeader = this.formBuilder.group(controls);
  }
  private filedMoreDate() {
    const controls = {
      fecha_fin: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      respuesta: [''],
      id_justification: [''],
      person_student_id: [''],
      fechaHoraValid: [''],
      codigo: [''],
    };
    this.formDate = this.formBuilder.group(controls);
  }
  closeModal() {
    this.activeModal.close('close');
  }
  getListEstudent() {
    const serviceName = END_POINTS.base_back.resourse + '/get-work-list-students';
    if (this.element?.id) {
      this.loading = true;
      this.generalServi.nameId$(serviceName, this.element.id).subscribe(
        (res: any) => {
          this.headStudent = (res && res.data) || '';
          // console.log(this.headStudent, 'essssss')
          // this.totalAlumnos = res.data && res.data[0].total_students || [];
          // this.listAlumns = res && res.data && res.data[0].total_students || [];
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
  selectedStudent(item: any) {
    this.notesState = true;
    this.formDate.controls['person_student_id'].setValue('');
    this.formHeader.controls['nota'].setValue(0);
    this.pending = '';
    this.listResponses = [];
    this.listAlumns.map((res: any) => {
      res.checked = false;
      res.background = '';
      res.color = '';
    });
    item.checked = true;
    item.background = 'brown';
    item.color = 'white';
    this.getPendings(item.persons_student_id);
    this.formDate.controls['person_student_id'].setValue(item.person_student_id);
    // this.formHeader.controls['nota'].setValue(item.nota || 0);
    this.datosStudent = item;
    if (this.element?.type_element?.codigo === 'FOR') {
      // SI ES FORO
      setTimeout(() => {
        this.getResponsesDocen(item.persons_student_id); //envir al hijo
      }, 1000);
    }
  }
  getPendings(id_person_student: any) {
    const serviceName = END_POINTS.base_back.resourse + '/get-pending-student';
    this.formDate.patchValue({
      fecha_fin: '',
      hora_fin: '',
      respuesta: '',
      id_justification: '',
      fechaHoraValid: '',
    });
    this.formDate.controls['respuesta'].setValidators([]);
    this.formDate.controls['respuesta'].updateValueAndValidity();
    this.formDate.controls['id_justification'].setValidators([]);
    this.formDate.controls['id_justification'].updateValueAndValidity();
    // this.userInfo.id
    this.loading = true;
    this.generalServi.nameIdAndId$(serviceName, this.element.id, id_person_student).subscribe((res: any) => {
        this.pending = res.data || '';

        if (this.has_rubric) {
          this.getRubric();
        }
        this.formDate.controls['fechaHoraValid'].setValue(res.data.student_pending.fecha_fin);
        if (res && res.data && res.data.student_pending && (res.data.student_pending.fecha_fin < this.timeActual)) {
          const f_h_fin = res.data.student_pending.fecha_fin.split(' ');
          this.formDate.patchValue({
            fecha_fin: this.renderDate(f_h_fin[0]),
            hora_fin: this.renderTime(f_h_fin[0], f_h_fin[1]),
            fechaHoraValid: res.data.student_pending.fecha_fin,
          });
          if (res.data.student_pending.justifications?.length>0) {
            this.formDate.controls['id_justification'].setValidators([Validators.required]);
            this.formDate.controls['id_justification'].updateValueAndValidity();
          }
        }
      },
      () => {
        // if (!this.has_rubric) {
          this.loading = false;
        // }
      },
      () => {
        // if (!this.has_rubric) {
          this.loading = false;
        // }
      }
    );
  }
  renderDate(date: any) {
    // console.log(date);

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
  changeTabSet($event: any) {
    this.formDate.controls['person_student_id'].setValue('');
    this.formHeader.controls['nota'].setValue(0);
    const idTab = $event.tabId;
    this.formDate.controls['codigo'].setValue(idTab);
    this.pending = '';
    this.datosStudent = '';
    this.listResponses = [];
    this.getStudentStatus(idTab);
    switch (idTab) {
      case 'ALL': // Todos
      case 'SC': // Sin calificar
      case 'C': //Calificados
      case 'SE': //Sin enviar

        break;
      default:
        break;
    }
  }
  getStudentStatus(codigo: any) {
    const serviceName = END_POINTS.base_back.resourse + '/get-list-students-by-code';
    const params = {
      codigo: codigo,
    };
    if (codigo) {
      this.loading = true;
      this.generalServi.nameIdParams$(serviceName, this.element.id, params).subscribe(
        (res: any) => {
          this.listAlumns = (res && res.data) || [];
          // if (this.listAlumns.length>0) {
          //   this.listAlumns.map((re:any) => {
          //     if (re.persons_student_id === 909) {
          //       re.realizo = '1';
          //      }
          //   })
          // }
        },() => {this.loading = false;},() => { this.loading = false;});
    }
  }

  getRubric() {
    if (this.has_rubric) {
      const serviceName = END_POINTS.base_back.rubrics + '/get-rubrica';
      this.loading = true;
      this.generalServi.nameId$(serviceName, this.element.rubricas_guia_id).subscribe((res: any) => {
        if (res.success) {
          if (this.has_rubric) {
            this.formHeader.controls['nota'].setValue(0);
          }
          this.formHeader.controls['comentario'].setValue('');
          this.rubrica = {};
          this.listRubric = [];
          this.listRubricMod = [];
          this.rubrica = res.data;
          this.checkAllNiveles();
          this.getRubricCalificacion();
        }
      },() => {this.loading = false;},() => { this.loading = false;});
    }
  }

  getRubricCalificacion() {
    const serviceName = END_POINTS.base_back.rubrics + '/get-rubricas-calification';
    const params = {
      pending_id: this.pending.student_pending.id,
      persons_student_id: this.pending.student_pending.persons_student_id,
    };
    this.generalServi.nameParams$(serviceName, params).subscribe(
      (res: any) => {
        if (res.success) {
          // console.log(res);
          // this.formHeader.controls['nota'].setValue(parseInt(res.data.nota));
          this.formHeader.controls['comentario'].setValue(res.data.comentario_docente);
          // console.log(this.rubrica);
          this.rubrica.criterios.map((rub: any) => {
            rub.niveles.map((niv: any) => {
              res.data.puntos.map((punt: any) => {
                if (punt.rubricas_id === niv.rubricas.id) {
                  this.selectedPoint(niv);
                }
              });
            });
          });
          // console.log(this.rubrica, 'lo logre');
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

  rubricColors(rubrica: any, i: any) {
    if (rubrica.checked) {
      return {
        background: this.colors[i],
        color: 'white',
      };
    } else {
      return {
        'background-color': this.bgColors[i],
        color: this.colors[i],
      };
    }
  }

  checkAllNiveles() {
    this.rubrica.criterios.map((criterio: any) => {
      criterio.niveles.map((item: any) => {
        item.checked = false;
      });
    });
  }

  selectedPoint(rubrica: any) {
    // console.log(this.formHeader.controls['nota'].value);
    if (this.pending) {
      this.rubrica.criterios.map((criterio: any) => {
        if (criterio.id === rubrica.rubricas.rubricas_criterio_id) {
          criterio.niveles.map((item: any) => {
            item.checked = false;
            this.listRubric.filter((res: any) => {
              if (res.rubricas.id === item.rubricas.id) {
                this.listRubric.splice(this.listRubric.indexOf(res), 1);
                this.formHeader.get('nota').setValue(this.formHeader.get('nota').value - res.rubricas.puntuacion);
              }
            });
          });
        }
      });
      rubrica.checked = true;
      this.listRubric.push(rubrica);
      this.formHeader.get('nota').setValue(rubrica.rubricas.puntuacion + this.formHeader.get('nota').value);
      // console.log(this.listRubric);
      // console.log(this.rubrica);
      // console.log(this.pending);
      this.listRubricMod = JSON.parse(JSON.stringify(this.listRubric));
      this.listRubricMod.map((res: any) => {
        res.rubricas_id = res.rubricas.id;
        res.rubricas_criterio_id = res.rubricas.rubricas_criterio_id;
        res.rubricas_nivele_id = res.rubricas.rubricas_nivele_id;
        res.puntuacion = res.rubricas.puntuacion;
        delete res.id;
        delete res.titulo;
        delete res.checked;
        delete res.rubricas;
      });
      // console.log(this.listRubricMod, 'modded');
    }
  }

  sendCalification() {
    // console.log(this.element, 'element');
    // console.log(this.pending, 'pending');
    const serviceName = END_POINTS.base_back.rubrics + '/rubricasRegistros';
    const params: any = {
      rubricas_guia_id: this.rubrica.id,
      persons_student_id: this.pending.student_pending.persons_student_id,
      tabla: this.pending.tipo,
      tabla_id: this.pending.student_pending.id,
      puntos: this.listRubricMod,
      nota: this.formHeader.get('nota').value,
      comentario_docente: this.formHeader.get('comentario').value,
      element_id: this.element.id,
    };

    // console.log(params);
    this.loading = true;
    this.generalServi.addNameData$(serviceName, params).subscribe(
      (res: any) => {
        if (res.success) {
          // this.fieldReactive();
          this.getListEstudent();
          this.getStudentStatus(this.formDate.value.codigo);
          // this.pending = '';
          // this.datosStudent = '';
          // this.listResponses = [];
          // this.getRubric();
          // console.log(res);
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

  calificarWork() {
    const serviceName = END_POINTS.base_back.resourse + '/marking-student-work';
    const forms = this.formHeader.value;
    const nota_student = this.child?.info?.nota
    let params: any;
    if(this.pending.tipo !== 'EVALUACION'){
      params = {
        comentario_docente: forms.comentario,
        nota: forms.nota,
      }
    }else{
      params = {
        comentario_docente: forms.comentario,
        nota: this.child?.info?.nota === null? forms.nota: nota_student,
      }
    }
    this.loading = true;
    this.generalServi.addNameIdData$(serviceName, this.pending.student_pending.id, params).subscribe(
      (res: any) => {
        if (res.success) {
          this.fieldReactive();
          this.getListEstudent();
          this.getStudentStatus(this.formDate.value.codigo);
          this.pending = '';
          this.datosStudent = '';
          this.listResponses = [];
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
  getUserInfo() {
    this.userInfo = this.userService.user;
  }
  getResponsesDocen(persons_student_id: any) {
    const serviceName = END_POINTS.base_back.resourse + '/list_responses_forum';
    const params = {
      person_id: persons_student_id,
    };
    if (params && params.person_id) {
      this.loading = true;
      this.generalServi.nameIdParams$(serviceName, this.element.forums.id, params).subscribe(
        (res: any) => {
          this.listResponses = res.data || [];
          if (this.listResponses.length > 0) {
            this.listResponses.map((re: any) => {
              re.checked = false;
            });
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

  loadings($event: any) {
    setTimeout(() => {
      this.loading = $event;
    }, 100);
  }
  infoQuestion($event: any) {
    if ($event) {
      this.formHeader.controls['nota'].setValue($event.nota);
      this.infor = $event;
    }
  }
  saveResponse(state:any) {
    const serviceName = 'pendings';
    const forms = this.formDate.value;
    let f_fin = '';
    let validFechas = true;
    if (state === 'aceptado') {
      f_fin = this.datepipe.transform(forms.fecha_fin, 'yyyy-MM-dd') + ' ' + this.datepipe.transform(forms.hora_fin, 'HH:mm:ss');
      const fechaAct:any = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
      if (f_fin <= fechaAct) {
        validFechas = false;
      }
    }
    const params = {
      fecha_fin: f_fin,
      justification: {
        id: forms.id_justification,
        respuesta: forms.respuesta || '',
        estado_justification: state,
      }
    };
    if (params && params.fecha_fin && params.justification.id && validFechas) {
      this.loading = true;
      this.generalServi.updateNameIdData$(serviceName, this.pending.student_pending.id, params).subscribe((res:any) => {
        if (res.success) {
          this.getPendings(res.data.persons_student_id);
        }
      }, () => {this.loading = false}, () => {this.loading = false;});

    } else {
      this.showToast('warning');
    }
  }
  savePendingActulizar() {
    const serviceName = 'pendings';
    const forms = this.formDate.value;
    const f_fin = this.datepipe.transform(forms.fecha_fin, 'yyyy-MM-dd') + ' ' + this.datepipe.transform(forms.hora_fin, 'HH:mm:ss');

    const params = {
      fecha_fin: f_fin,
    };
    this.loading = true;
    this.generalServi.updateNameIdData$(serviceName, this.pending.student_pending.id, params).subscribe((res:any) => {
      if (res.success) {
        this.getPendings(res.data.persons_student_id);
      }
    }, () => {this.loading = false}, () => {this.loading = false;})
  }
  changeJustification($event:any) {
    this.formDate.controls['respuesta'].setValue();
    if ($event) {
      this.formDate.controls['respuesta'].setValidators([Validators.required]);
      this.formDate.controls['respuesta'].updateValueAndValidity();
    }
  }
  showToast(status: NbComponentStatus) {
    this.toastrService.show(status, `La fecha y hora debe ser mayor a la fecha actual`, { status });
  }
}
