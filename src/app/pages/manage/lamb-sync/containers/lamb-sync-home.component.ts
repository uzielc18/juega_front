import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { GeneralService } from '../../../../providers';
import { END_POINTS } from '../../../../providers/utils/end-points';
import { ListCursosComponent } from '../components/modals/list-cursos/list-cursos.component';
import { ListEstudiantesComponent } from '../components/modals/list-estudiantes/list-estudiantes.component';
import { ListSilabusComponent } from '../components/modals/list-silabus/list-silabus.component';

@Component({
  selector: 'app-lamb-sync-home',
  templateUrl: './lamb-sync-home.component.html',
  styleUrls: ['./lamb-sync-home.component.scss'],
})
export class LambSyncHomeComponent implements OnInit {
  id_unidad_academica: any = '0';
  id_carga_curso: any = '0';
  usuario: any = '0';

  sedes: any = [];
  nivelEnsenanza: any = [];
  facultades: any = [];
  programa_estudios: any = [];
  semestres: any = [];

  docentes: any = [];
  cursos: any = [];
  silabus: any = [];
  estudiantes: any = [];

  loading: boolean = false;
  formHeader: any = FormGroup;
  @Output() changeEmit: EventEmitter<any> = new EventEmitter();

  constructor(
    private generalService: GeneralService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.fieldReactive();
  }

  private fieldReactive() {
    const controls = {
      sede: ['', [Validators.required]],
      nivel_ensenanza: ['', [Validators.required]],
      facultad: ['', [Validators.required]],
      programa_estudio: ['', [Validators.required]],
      semestre: [this.rolSemestre.semestre.nombre || '', [Validators.required]],
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
    const serviceName = END_POINTS.base_back.config + '/sedes';
    this.loading = true;
    this.generalService.nameAll$(serviceName).subscribe(
      (res: any) => {
        this.sedes = res.data || [];
        if (this.sedes.length > 0) {
          this.formHeader.patchValue({
            sede: this.sedes[0],
          });
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
                r.name_programa_estudio =
                  r.nombre_corto + ' (' + r.sede_nombre + ' - ' + r.semiprecencial_nombre + ' )';
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
    this.facultades = [];
    this.programa_estudios = [];
    this.formHeader.controls['facultad'].setValue('');
    this.formHeader.controls['programa_estudio'].setValue('');
    this.listFacultades(nivel.id, this.formHeader.get('sede').value.id);
  }

  selectedFacultad(fac: any) {
    this.formHeader.controls['facultad'].setValue(fac);
    this.programa_estudios = [];
    this.formHeader.controls['programa_estudio'].setValue('');
    this.listProgramaEstudios(
      this.formHeader.get('nivel_ensenanza').value.id,
      this.formHeader.get('sede').value.id,
      fac.id
    );
  }

  selectedProgramaEstudio(prog: any) {
    this.formHeader.controls['programa_estudio'].setValue(prog);
  }

  showCursos() {
    const serviceName = END_POINTS.base_back.config + '/cursos';
    this.loading = true;
    if (this.formHeader.get('programa_estudio').value) {
      this.generalService
        .nameIdAndIdAndIdAndId$(
          serviceName,
          this.rolSemestre.semestre.nombre,
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
              .onClose.subscribe((result) => {
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
          this.rolSemestre.semestre.nombre,
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
              .onClose.subscribe((result) => {
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
          this.rolSemestre.semestre.nombre,
          this.formHeader.get('programa_estudio').value.id_programa_estudio
        )
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
              .onClose.subscribe((result) => {
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
}
