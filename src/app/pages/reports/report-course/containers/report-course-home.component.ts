import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";

@Component({
  selector: 'app-report-course-home',
  templateUrl: './report-course-home.component.html',
  styleUrls: ['./report-course-home.component.scss']
})
export class ReportCourseHomeComponent implements OnInit {

  loading: boolean = false;
  formHeader: any = FormGroup;
  count: any = [];
  success: any;
  data: any = [];
  sedes: any = [];
  nivelEnsenanza: any = [];
  facultades: any = [];
  programa_estudios: any = [];
  listOfTeachers: any = [];
  showTeachers: boolean = false;
  resetTeacherButton: boolean = false;
  showTeachersToImport: boolean = false;
  resetTeacherImportButton: boolean = false;

  ciclos: any = [{ciclo: '1'}, {ciclo:'2'}, {ciclo:'3'}, {ciclo:'4'}, {ciclo:'5'}, {ciclo:'6'}, {ciclo:'7'}, {ciclo:'8'}, {ciclo:'9'}, {ciclo:'10'}, {ciclo:'11'}, {ciclo:'12'}, {ciclo:'13'}, {ciclo:'14'}];
  estados: any[] = [
    {nombre: 'Calificados', value: 'CA'},
    {nombre: 'Sin calificar', value: 'SC'},
    {nombre: 'Próximos', value: 'PX'},
    {nombre: 'Re-Apertura', value: 'RA'},
  ];
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
      programa_estudio: [{ value: '', disabled: true }],
      semestre: [this.rolSemestre.semestre.nombre || '', [Validators.required]],
      ciclo: [''],
      elemento:[''],
      termino: [''],
      id_docente: ['']
    };
    this.formHeader = this.fb.group(controls);
    this.listSedes();
    this.getListOfTeachers();
      for (let i = 0; i < 20; i++) {
        this.count.push(i)
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
  // Teachers
  getListOfTeachers() {
    if (this.rolSemestre.rol.name === 'Admin') {
      const serviceName = END_POINTS.base_back.default + 'get-teachers';
      this.loading = true;
      this.generalService.nameAll$(serviceName).subscribe(
        (res: any) => {
          if (res.success) {
            this.listOfTeachers = res.data;
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
  searchTeachers() {
    this.showTeachers = true;
    this.resetTeacherButton = true;
  }

  resetTeachers() {
    this.formHeader.controls['termino'].setValue('');
    this.resetTeacherButton = false;
    this.showTeachers = false;
  }
  setTeacher(teacher: any) {
    this.showTeachers = false;
    this.formHeader.controls['termino'].setValue(teacher.nombres_completos);
    this.formHeader.controls['id_docente'].setValue(teacher.id);
  }
    filterReports(){
    console.log(this.formHeader.get('termino').value)
    const serviceName = END_POINTS.base_back.reportes + '/cursos';
    const sede = this.formHeader.get('sede').value.id;
    const nivel_ensenanza = this.formHeader.get('nivel_ensenanza').value.id;
    const sede_area = this.formHeader.get('facultad').value.id;
    const params = {
      semester_id: this.rolSemestre.semestre.id,
      docente : this.formHeader.get('id_docente').value
    }
    this.loading = true;
    this.generalService.nameIdAndIdAndIdParams$(serviceName, sede, nivel_ensenanza, sede_area, params).subscribe(res => {
        this.data = res.data
       if(res.success){
         this.success = true
       }
    }, ()=> {this.loading = false}, () => {this.loading = false})
  }
}
