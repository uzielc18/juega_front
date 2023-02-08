import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";

@Component({
  selector: 'app-lamb-sync-canva-home',
  templateUrl: './lamb-sync-canva-home.component.html',
  styleUrls: ['./lamb-sync-canva-home.component.scss'],
})
export class LambSyncCanvaHomeComponent implements OnInit {

  sedes: any = [];
  nivelEnsenanza: any = [];
  facultades: any = [];
  programa_estudios: any = [];
  semestres: any = [];

  validateIdCanva: any;

  courses_I: any;
  enrollments: any;
  teachers_I: any;

  cursos: any = [];
  cursos_docentes: any = [];
  docentes: any = [];
  estudiantes: any = [];
  matriculas: any = [];
  zoom: any = [];

  loading: boolean = false;
  formHeader: any = FormGroup;
  constructor(private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      sede: ['', [Validators.required]],
      nivel_ensenanza: [{ value: '', disabled: true }, [Validators.required]],
      facultad: [{ value: '', disabled: true }, [Validators.required]],
      programa_estudio: [{ value: '', disabled: true }, [Validators.required]],
      semestre: [

        this.rolSemestre.semestre.id || '',
        [Validators.required]
      ],

    };
    if(!this.rolSemestre.semestre.id_canva) {
        this.validateIdCanva = this.rolSemestre.semestre.nombre
    }else {
      this.validateIdCanva = false;
    }
    this.formHeader = this.fb.group(controls);
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
    const params = {
      all: 0
    }
    if (this.nivelEnsenanza.length > 0) {
      this.loading = true;
      this.generalService.nameIdAndIdParams$(serviceName, nivel_ense_id, sede_id, params).subscribe(
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
    this.getInfoCanvaPanel(prog, this.formHeader.value.semestre);
    this.getCanvaInfo(prog, this.formHeader.value.semestre);
  }
  selectSemester(sem: any) {
    if(!sem.id_canva) {
      this.validateIdCanva = sem.nombre;
    }else {
      this.validateIdCanva = false;
    }
    if(this.formHeader.value.programa_estudio) {
      this.getInfoCanvaPanel(this.formHeader.value.programa_estudio, sem.id);
      this.getCanvaInfo(this.formHeader.value.programa_estudio, sem.id);
    }
  }

  getInfoCanvaPanel(prog: any, sem: any) {
    const serviceName = 'canva-info-panel';
    const params = {
      programa_estudio_id: prog.id,
      semester_id: sem
    }
    this.loading = true;
    this.generalService.nameParams$(serviceName, params).subscribe(res => {
      this.cursos = res.data.cursos;
      this.cursos_docentes = res.data.cursos_docentes;
      this.docentes = res.data.docentes;
      this.estudiantes = res.data.estudiantes;
      this.matriculas = res.data.matriculas;
      this.zoom = res.data.zooms;
    }, () => {this.loading = false}, () => {this.loading = false})
  }
  getForm($event: boolean) {
    if($event) {
      setTimeout(() => {
        this.getInfoCanvaPanel(this.formHeader.value.programa_estudio,  this.formHeader.value.semestre);
        this.getCanvaInfo(this.formHeader.value.programa_estudio, this.formHeader.value.semestre);
      }, 100);
    }
  }
  getCanvaInfo(prog: any, semes: any){
    const serviceName = 'canva-info';
    const params = {
      programa_estudio_id: prog.id,
      semester_id: semes

    }
    this.loading = true;
    this.generalService.nameParams$(serviceName, params).subscribe(res => {
      this.courses_I = {
        courses: res.data.courses,
        courses_en_canva: res.data.courses_en_canva
      }
      this.enrollments = {
        enrollments: res.data.enrollments,
        enrollments_en_canva: res.data.enrollments_en_canva
      }
      this.teachers_I = {
        teacher_en_canva: res.data.teacher_en_canva,
        teachers: res.data.teachers
      }
    },() => { this.loading = false;}, () => { this.loading = false;})
  }
  updateSemesterCanva() {
    const serviceName = 'canva-update-terms';
    this.loading = true;
    this.generalService.nameAll$(serviceName).subscribe(res => {
      if(res.success) {
        this.listSemesters()
      }

    }, () => {this.loading = false}, () => {this.loading = false})
  }
  refresh() {
    this.getInfoCanvaPanel(this.formHeader.value.programa_estudio,  this.formHeader.value.semestre);
    this.getCanvaInfo(this.formHeader.value.programa_estudio, this.formHeader.value.semestre);
  }
}
