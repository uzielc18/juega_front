import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { GeneralService } from '../../../../providers';
import { END_POINTS } from '../../../../providers/utils/end-points';
import { ListCursosComponent } from '../components/modals/list-cursos/list-cursos.component';
import { ListEstudiantesComponent } from '../components/modals/list-estudiantes/list-estudiantes.component';
import { ListMatriculasComponent } from '../components/modals/list-matriculas/list-matriculas.component';
import { ListSilabusComponent } from '../components/modals/list-silabus/list-silabus.component';
import {ListDocenteComponent} from "../components/modals/list-docente/list-docente.component";
import {ListEvaluationsComponent} from "../components/modals/list-evaluations/list-evaluations.component";

@Component({
  selector: 'app-lamb-sync-home',
  templateUrl: './lamb-sync-home.component.html',
  styleUrls: ['./lamb-sync-home.component.scss'],
})
export class LambSyncHomeComponent implements OnInit {
  id_programa_estudio: any = '0';
  id_unidad_academica: any = '0';
  id_carga_curso: any = '0';
  codigo: any = '0';
  usuario: any = '0';

  sedes: any = [];
  nivelEnsenanza: any = [];
  facultades: any = [];
  programa_estudios: any = [];
  semestres: any = [];

  listEstudiantes: any = [];
  searchstring: any = [];

  docentes: any = [];
  cursos: any = [];
  silabus: any = [];
  estudiantes: any = [];
  evaluaciones: any = [];
  matriculas: any = [];

  loading: boolean = false;
  formHeader: any = FormGroup;
  @Output() changeEmit: EventEmitter<any> = new EventEmitter();

  constructor(
    private generalService: GeneralService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.fieldReactive();
  }

  private fieldReactive() {
    const controls = {
      sede: ['', [Validators.required]],
      nivel_ensenanza: [{ value: '', disabled: true }, [Validators.required]],
      facultad: [{ value: '', disabled: true }, [Validators.required]],
      programa_estudio: [{ value: '', disabled: true }, [Validators.required]],
      semestre: [this.rolSemestre.semestre.nombre || '', [Validators.required]],
      termino: ['', [Validators.required]],
      estudiante: ['', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.listSedes();
    this.listSemesters();
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

  listSedes() {
    const serviceName = END_POINTS.base_back.default + 'sedes';
    this.loading = true;
    this.generalService.nameAll$(serviceName).subscribe(
      (res: any) => {
        this.sedes = res.data || [];
        if (this.sedes.length > 0) {
          this.formHeader.patchValue({
            sede: this.sedes[0],
          });
          this.formHeader.controls['nivel_ensenanza'].enable();
          this.listNivelEnsenanza(this.sedes[0].id);
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

  listNivelEnsenanza(sede_id: any) {
    const serviceName = END_POINTS.base_back.nivel_ensenanza;
    if (this.sedes.length > 0) {
      this.loading = true;
      this.generalService.nameId$(serviceName, sede_id).subscribe(
        (res: any) => {
          this.nivelEnsenanza = res.data || [];
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

  listFacultades(nivel_ense_id: any, sede_id: any) {
    const serviceName = END_POINTS.base_back.sede_areas;
    if (this.nivelEnsenanza.length > 0) {
      this.loading = true;
      this.generalService.nameIdAndId$(serviceName, nivel_ense_id, sede_id).subscribe(
        (res: any) => {
          this.facultades = res.data || [];
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

  listProgramaEstudios(nivel_ense_id: any, sede_id: any, fac_id: any) {
    const serviceName = END_POINTS.base_back.programa_estudios;
    if (this.facultades.length > 0) {
      this.loading = true;
      this.generalService.nameIdAndIdAndId$(serviceName, nivel_ense_id, sede_id, fac_id).subscribe(
        (res: any) => {
          this.programa_estudios = res.data || [];
          if (this.programa_estudios.length > 0) {
            this.programa_estudios.map((r: any) => {
              r.name_programa_estudio = r.nombre_corto + ' ' + (r.sede_nombre ? r.sede_nombre : '');
              if (r.semiprecencial_nombre) {
                r.name_programa_estudio = r.nombre_corto + ' (' + r.sede_nombre + ' - ' + r.semiprecencial_nombre + ' )';
              }
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

  listSemesters() {
    const serviceName = END_POINTS.base_back.semesters;
    this.loading = true;
    this.generalService.nameAll$(serviceName).subscribe(
      (res: any) => {
        this.semestres = res.data || [];
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  selectedSede(sede: any) {
    this.formHeader.controls['sede'].setValue(sede);
    this.formHeader.controls['nivel_ensenanza'].enable();
    this.nivelEnsenanza = [];
    this.facultades = [];
    this.programa_estudios = [];
    this.formHeader.controls['nivel_ensenanza'].setValue('');
    this.formHeader.controls['facultad'].setValue('');
    this.formHeader.controls['programa_estudio'].setValue('');
    this.listNivelEnsenanza(sede.id);
  }

  selectedNivel(nivel: any) {
    this.formHeader.controls['nivel_ensenanza'].setValue(nivel);
    this.formHeader.controls['facultad'].enable();
    this.facultades = [];
    this.programa_estudios = [];
    this.formHeader.controls['facultad'].setValue('');
    this.formHeader.controls['programa_estudio'].setValue('');
    this.listFacultades(nivel.id, this.formHeader.get('sede').value.id);
  }

  selectedFacultad(fac: any) {
    this.formHeader.controls['facultad'].setValue(fac);
    this.formHeader.controls['programa_estudio'].enable();
    this.programa_estudios = [];
    this.formHeader.controls['programa_estudio'].setValue('');
    this.listProgramaEstudios(this.formHeader.get('nivel_ensenanza').value.id, this.formHeader.get('sede').value.id, fac.id);
  }

  selectedProgramaEstudio(prog: any) {
    this.formHeader.controls['programa_estudio'].setValue(prog);
  }

  showCursos() {
    console.log(this.formHeader.get('semestre').value);
    const serviceName = END_POINTS.base_back.config + '/cursos';
    this.loading = true;
    if (this.formHeader.get('programa_estudio').value) {
      this.generalService
        .nameIdAndIdAndIdAndId$(
          serviceName,
          //this.rolSemestre.semestre.nombre,
          this.formHeader.get('semestre').value,
          this.formHeader.get('programa_estudio').value.id_programa_estudio,
          this.id_unidad_academica,
          this.usuario
        )
        .subscribe(
          (res: any) => {
            this.cursos = res.data || [];
            this.dialogService
              .open(ListCursosComponent, {
                dialogClass: 'dialog-limited-height',
                context: {
                  item: this.cursos,
                  prog: this.formHeader.get('programa_estudio').value,
                },
                closeOnBackdropClick: false,
                closeOnEsc: false,
              })
              .onClose.subscribe(result => {
                if (result === 'ok') {
                  this.changeEmit.emit();
                }
              });
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

  showSilabus() {
    const serviceName = END_POINTS.base_back.config + '/silabus';
    this.loading = true;
    if (this.formHeader.get('programa_estudio').value) {
      this.generalService
        .nameIdAndIdAndId$(
          serviceName,
          //this.rolSemestre.semestre.nombre,
          this.formHeader.get('semestre').value,
          this.id_carga_curso,
          this.formHeader.get('programa_estudio').value.id_programa_estudio
        )
        .subscribe(
          (res: any) => {
            this.silabus = res.data || [];
            this.dialogService
              .open(ListSilabusComponent, {
                dialogClass: 'dialog-limited-height',
                context: {
                  item: this.silabus,
                  prog: this.formHeader.get('programa_estudio').value,
                },
                closeOnBackdropClick: false,
                closeOnEsc: false,
              })
              .onClose.subscribe(result => {
                if (result === 'ok') {
                  this.changeEmit.emit();
                }
              });
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

  showEstudiantes() {
    const serviceName = END_POINTS.base_back.config + '/estudiantes';
    this.loading = true;
    if (this.formHeader.get('programa_estudio').value) {
      this.generalService
        .nameIdAndId$(
          serviceName,
          //this.rolSemestre.semestre.nombre,
          this.formHeader.get('semestre').value,
          this.formHeader.get('programa_estudio').value.id_programa_estudio)
        .subscribe(
          (res: any) => {
            this.estudiantes = res.data || [];
            this.dialogService
              .open(ListEstudiantesComponent, {
                dialogClass: 'dialog-limited-height',
                context: {
                  item: this.estudiantes,
                  prog: this.formHeader.get('programa_estudio').value,
                },
                closeOnBackdropClick: false,
                closeOnEsc: false,
              })
              .onClose.subscribe(result => {
                if (result === 'ok') {
                  this.changeEmit.emit();
                }
              });
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

  showMatriculas() {
    const serviceName = END_POINTS.base_back.config + '/get-enrollments';
    this.loading = true;
    if (this.formHeader.get('programa_estudio').value) {
      this.generalService
        .nameIdAndIdAndIdAndId$(
          serviceName,
          //this.rolSemestre.semestre.nombre,
          this.formHeader.get('semestre').value,
          this.id_carga_curso,
          this.codigo,
          this.formHeader.get('programa_estudio').value.id_programa_estudio
        )
        .subscribe(
          (res: any) => {
            this.matriculas = res.data || [];
            this.dialogService
              .open(ListMatriculasComponent, {
                dialogClass: 'dialog-limited-height',
                context: {
                  item: this.matriculas,
                  prog: this.formHeader.get('programa_estudio').value,
                },
                closeOnBackdropClick: false,
                closeOnEsc: false,
              })
              .onClose.subscribe(result => {
                if (result === 'ok') {
                  this.changeEmit.emit();
                }
              });
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

  showDocentes(){
    const serviceName = END_POINTS.base_back.config + '/docentes';
    this.loading = true;
    if (this.formHeader.get('programa_estudio').value) {
      this.generalService
        .nameId$(
          serviceName,
          //this.rolSemestre.semestre.nombre,
          this.formHeader.get('semestre').value)
        .subscribe(
          (res: any) => {
            this.docentes = res.data || [];
            this.dialogService
              .open(ListDocenteComponent, {
                dialogClass: 'dialog-limited-height',
                context: {
                  item: this.docentes,
                },
                closeOnBackdropClick: false,
                closeOnEsc: false,
              })
              .onClose.subscribe(result => {
              if (result === 'ok') {
                this.changeEmit.emit();
              }
            });
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

  showEvaluations(){
    const serviceName = END_POINTS.base_back.config + '/get-evaluations/0';
    this.loading = true;
    if (this.formHeader.get('programa_estudio').value) {
      this.generalService
        .nameIdAndId$(
          serviceName,
          this.formHeader.get('programa_estudio').value.id_programa_estudio,
          this.formHeader.get('semestre').value
          )
        .subscribe(
          (res: any) => {
            this.evaluaciones = res.data || [];
            this.dialogService
              .open(ListEvaluationsComponent, {
                dialogClass: 'dialog-limited-height',
                context: {
                  item: this.evaluaciones,
                },
                closeOnBackdropClick: false,
                closeOnEsc: false,
              })
              .onClose.subscribe(result => {
              if (result === 'ok') {
                this.changeEmit.emit();
              }
            });
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
  searchStudent() {
    const serviceName = END_POINTS.base_back.default + 'person-search';
    if (this.formHeader.get('termino').value !== '') {
      this.formHeader.controls['termino'].valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged((curr: any, prev: any) => {
            return curr.toLowerCase() === prev.toLowerCase();
          }),
          switchMap(text => {
            this.searchstring.push(text);
            if (text !== '' && this.searchstring[this.searchstring.length - 1] !== this.searchstring[this.searchstring.length - 2]) {
              return this.generalService.nameParams$(serviceName, { q: text });
            } else {
              this.searchstring = [];
              this.listEstudiantes = [];
              return [];
            }
          })
        )
        .subscribe((res: any) => {
          if (res.data) {
            this.listEstudiantes = res.data.splice(0, 5);
          }
          // console.log(this.listEstudiantes);
        });
    }
  }

  setTermino(termino: any) {
    if (termino !== '') {
      this.formHeader.controls['termino'].setValue(`${termino.nombres} ${termino.apellido_paterno} ${termino.apellido_materno}`);
      this.formHeader.controls['estudiante'].setValue(termino);
      this.listEstudiantes = [];
      // console.log(this.formHeader.controls['termino'].value);
    }
  }

  matriculaByStudent() {
    const serviceName = END_POINTS.base_back.config + '/get-enrollments';
    this.loading = true;
    if (this.formHeader.get('estudiante').value) {
      this.generalService
        .nameIdAndIdAndIdAndId$(
          serviceName,
          this.rolSemestre.semestre.nombre,
          this.id_carga_curso,
          this.formHeader.get('estudiante').value.codigo,
          this.id_programa_estudio
        )
        .subscribe(
          (res: any) => {
            // console.log(res);
            this.toastrService.info(status, `${res.message}`);
            this.formHeader.controls['termino'].setValue('');
            this.formHeader.controls['estudiante'].setValue('');
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
}
