import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  maxValor: any = 17;
  success: any;
  data: any = [];
  sedes: any = [];
  nivelEnsenanza: any = [];
  facultades: any = [];
  programa_estudios: any = [];
  listOfTeachers: any = [];
  showTeachers: boolean = false;
  resetTeacherButton: boolean = false;


  ciclos: any = [{ciclo: '1'}, {ciclo:'2'}, {ciclo:'3'}, {ciclo:'4'}, {ciclo:'5'}, {ciclo:'6'}, {ciclo:'7'}, {ciclo:'8'}, {ciclo:'9'}, {ciclo:'10'}, {ciclo:'11'}, {ciclo:'12'}, {ciclo:'13'}, {ciclo:'14'}];
  estados: any[] = [
    {nombre: 'Todos', value: 'TODO'},
    {nombre: 'Trabajo', value: 'TRA'},
    {nombre: 'Video', value: 'VIDE'},
    {nombre: 'Enlace', value: 'ENLA'},
    {nombre: 'Foro', value: 'FORO'},
    {nombre: 'Documento', value: 'DOC'},
    {nombre: 'Clase grabada', value: 'CLG'},
    {nombre: 'Evaluación', value: 'EVA'}

  ];
  elemento: any = new FormControl('');
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
      termino: [''],
      id_docente: [''],
      id_programa_estudio: ['']
    };
    this.formHeader = this.fb.group(controls);
    this.listSedes();
    this.getListOfTeachers();
    for (let i = 0; i < 17; i++) {
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
    this.formHeader.controls['id_programa_estudio'].setValue(prog.id)
  }
  searchTeachers() {
    this.showTeachers = true;
    this.resetTeacherButton = true;
  }

  resetTeachers() {
    this.formHeader.controls['termino'].setValue('');
    this.formHeader.controls['id_docente'].setValue('');
    this.resetTeacherButton = false;
    this.showTeachers = false;
  }
  setTeacher(teacher: any) {
    this.showTeachers = false;
    this.formHeader.controls['termino'].setValue(teacher.nombres_completos);
    this.formHeader.controls['id_docente'].setValue(teacher.id);
  }
  selectElement(element: any){
      const a = this.data.map((m: any) => {
          m.topics.map((t: any) => {
            if(element.value === 'TODO'){
              t.elementoEST = t.total
            }
            if(element.value === 'TRA'){
              t.elementoEST = t.trabajo
            }
            if(element.value === 'VIDE'){
              t.elementoEST = t.video
            }
            if(element.value === 'ENLA'){
              t.elementoEST = t.enlace
            }
            if(element.value === 'FORO'){
              t.elementoEST = t.foro
            }
            if(element.value === 'DOC'){
              t.elementoEST = t.documento
            }
            if(element.value === 'CLG'){
              t.elementoEST = t.clase_grabada
            }
            if(element.value === 'EVA'){
              t.elementoEST = t.evaluacion
            }
          })
      })
  }
    filterReports(){
    const serviceName = END_POINTS.base_back.reportes + '/cursos';
    const sede = this.formHeader.get('sede').value.id || 0;
    const nivel_ensenanza = this.formHeader.get('nivel_ensenanza').value.id || 0;
    const sede_area = this.formHeader.get('facultad').value.id || 0;
    const params = {
      semester_id: this.rolSemestre.semestre.id,
      programa_estudio_id: this.formHeader.get('id_programa_estudio').value || 0,
      docente : this.formHeader.get('id_docente').value || 0,
      ciclo: this.formHeader.value.ciclo || 0
    }
    this.loading = true;
    this.generalService.nameIdAndIdAndIdParams$(serviceName, sede, nivel_ensenanza, sede_area, params).subscribe(res => {
        this.data = res.data;
        this.data.map((m: any) => {
              if(m.topics.length === 0){
                m.guion = '-'
              }
              return m.topics.map((t: any) => {
                t.elementoEST = t.total;
              })
        })
             if(res.success){
               this.success = true;
               this.count = [];
               this.elemetsFor(this.data);


             }
    }, ()=> {this.loading = false}, () => {this.loading = false})
  }
  elemetsFor(item: any){
    const arr: any = [];
    item.forEach((m: any) => {
      arr.push(m.topics.length);
    })
     let v = Math.max(...arr)
    this.maxValor = v
    for (let i = 0; i < v; i++) {
      this.count.push(i)
    }
    item.map((m: any) => {
      let s = v - m.topics.length;
      m.tdGuion = 0
      if(m.topics.length !== 0){
        m.tdGuion = [];

        for (let i = 0; i < s; i++) {
          m.tdGuion.push(i);
        }
      }
    })

  }
}
