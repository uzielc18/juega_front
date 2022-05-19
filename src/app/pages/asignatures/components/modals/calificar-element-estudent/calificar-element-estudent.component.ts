import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { AppService } from 'src/app/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { CForumsComponent } from '../../c-free/calificar-elements/c-forums/c-forums.component';

@Component({
  selector: 'app-calificar-element-estudent',
  templateUrl: './calificar-element-estudent.component.html',
  styleUrls: ['./calificar-element-estudent.component.scss'],
})
export class CalificarElementEstudentComponent implements OnInit {
  loading:boolean = false;
  @Input() element:any;
  @Input() rol:any;
  @Input() directore:any;
  listAlumns:any = [];
  formHeader: any = FormGroup;
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
  constructor(
    public activeModal: NbDialogRef<CalificarElementEstudentComponent>,
    private formBuilder: FormBuilder,
    private generalServi: GeneralService,
    private userService: AppService
  ) {
    this.searchableList = ['nombres', 'apellido_paterno', 'apellido_materno'];
  }

  ngOnInit(): void {
    this.has_rubric = this.element.rubricas_guia_id !== null ? true : false;
    this.fieldReactive();
    this.filedMoreDate();
    this.getListEstudent();
    // console.log(this.formHeader.value);
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
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      person_student_id: [''],
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
          console.log(this.headStudent, 'essssss')
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
    // this.userInfo.id
    this.loading = true;
    this.generalServi.nameIdAndId$(serviceName, this.element.id, id_person_student).subscribe(
      (res: any) => {
        this.pending = res.data || '';
        if (this.has_rubric) {
          this.getRubric();
        }
      },
      () => {
        if (!this.has_rubric) {
          this.loading = false;
        }
      },
      () => {
        if (!this.has_rubric) {
          this.loading = false;
        }
      }
    );
  }
  updateDateStudent() {}
  changeTabSet($event: any) {
    this.formDate.controls['person_student_id'].setValue('');
    this.formHeader.controls['nota'].setValue(0);
    const idTab = $event.tabId;
    this.formDate.controls['codigo'].setValue(idTab);
    this.pending = '';
    this.datosStudent = '';
    this.listResponses = [];
    switch (idTab) {
      case 'ALL': // Todos
      case 'SC': // Sin calificar
      case 'C': //Calificados
      case 'SE': //Sin enviar
        this.getStudentStatus(idTab);
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
      });
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
          console.log(res);
          // this.formHeader.controls['nota'].setValue(parseInt(res.data.nota));
          this.formHeader.controls['comentario'].setValue(res.data.comentario_docente);
          console.log(this.rubrica);
          this.rubrica.criterios.map((rub: any) => {
            rub.niveles.map((niv: any) => {
              res.data.puntos.map((punt: any) => {
                if (punt.rubricas_id === niv.rubricas.id) {
                  this.selectedPoint(niv);
                }
              });
            });
          });
          console.log(this.rubrica, 'lo logre');
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
    console.log(this.formHeader.controls['nota'].value);
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
      console.log(this.listRubric);
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
      console.log(this.listRubricMod, 'modded');
    }
  }

  sendCalification() {
    console.log(this.element, 'element');
    console.log(this.pending, 'pending');
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
    const params: any = {
      comentario_docente: forms.comentario,
      nota: forms.nota,
    };
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
}
