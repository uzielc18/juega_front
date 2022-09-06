import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";
import {Observable, of} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-report-course-home',
  templateUrl: './report-course-home.component.html',
  styleUrls: ['./report-course-home.component.scss']
})
export class ReportCourseHomeComponent implements OnInit {

  loading: boolean = false;
  formHeader: any = FormGroup;
  maxValorTopcis: any = [];
  topicsLengthgMaxValor: any = 17;
  success: any;
  data: any = [];
  sedes: any = [];
  nivelEnsenanza: any = [];
  facultades: any = [];
  programa_estudios: any = [];
  programa_estudios_filter$?: Observable<any[]>;
  listOfTeachers: any = [];
  showTeachers: boolean = false;
  resetTeacherButton: boolean = false;
  selectedItem = 20;
  pagination: any = {
    page: 1,
    per_page: 20,
    sizePage: 0,
    sizeListData: 0,
    isDisabledPage: false,
  };
  pagesCount: any[] = [20, 30, 50];

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
      semestre: [this.rolSemestre?.semestre?.nombre || '', [Validators.required]],
      ciclo: [''],
      termino: [''],
      id_docente: [''],
      id_programa_estudio: ['']
    };
    this.formHeader = this.fb.group(controls);
    this.listSedes();
    this.getListOfTeachers();
    for (let i = 0; i < 17; i++) {
      //inicializamos con 17 por defecto
      this.maxValorTopcis.push(i)
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
          this.programa_estudios_filter$ = of(this.programa_estudios);
          this.programa_estudios_filter$ = this.formHeader.get('programa_estudio').valueChanges.pipe(startWith(''),
            map((filter: any) => this.filter(filter)))
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
  private filter(value: any): any[] {
    const filterValue = value;
    return this.programa_estudios.filter((optionValue: any) => optionValue.name_programa_estudio.toLowerCase().includes(filterValue));
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

  loadPage($event: any): any {
    this.loading = true;
    this.pagination.page = $event;
    this.filterReports()
  }
  sizeTable($event: any): any {
    this.pagination.per_page = $event;
    this.filterReports()
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
    this.formHeader.controls['id_programa_estudio'].setValue('');
    this.listNivelEnsenanza(sede.id);
  }
  selectedNivel(nivel: any) {
    this.formHeader.controls['nivel_ensenanza'].setValue(nivel);
    this.formHeader.controls['facultad'].enable();
    this.facultades = [];
    this.programa_estudios = [];
    this.formHeader.controls['facultad'].setValue('');
    this.formHeader.controls['programa_estudio'].setValue('');
    this.formHeader.controls['id_programa_estudio'].setValue('');
    this.listFacultades(nivel.id, this.formHeader.get('sede').value.id);
  }

  selectedFacultad(fac: any) {
    this.formHeader.controls['facultad'].setValue(fac);
    this.formHeader.controls['programa_estudio'].enable();
    this.programa_estudios = [];
    this.formHeader.controls['programa_estudio'].setValue('');
    this.formHeader.controls['id_programa_estudio'].setValue('');
    this.listProgramaEstudios(this.formHeader.get('nivel_ensenanza').value.id, this.formHeader.get('sede').value.id, fac.id);
  }
  selectedProgramaEstudio(prog: any) {
    this.formHeader.controls['programa_estudio'].setValue(prog.name_programa_estudio);
    this.formHeader.controls['id_programa_estudio'].setValue(prog.id)
  }
  selectedProgramaEstudiok(prog: any){
    console.log(prog)
    this.formHeader.controls['programa_estudio'].setValue(prog.name_programa_estudio);
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
              t.elemento_total = t.total
            }
            if(element.value === 'TRA'){
              t.elemento_total = t.trabajo
            }
            if(element.value === 'VIDE'){
              t.elemento_total = t.video
            }
            if(element.value === 'ENLA'){
              t.elemento_total = t.enlace
            }
            if(element.value === 'FORO'){
              t.elemento_total = t.foro
            }
            if(element.value === 'DOC'){
              t.elemento_total = t.documento
            }
            if(element.value === 'CLG'){
              t.elemento_total = t.clase_grabada
            }
            if(element.value === 'EVA'){
              t.elemento_total = t.evaluacion
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
      ciclo: this.formHeader.value.ciclo || 0,
      per_page: this.pagination.per_page,
      page: this.pagination.page,
      paginate: 'S',
    }
    this.loading = true;
    this.generalService.nameIdAndIdAndIdParams$(serviceName, sede, nivel_ensenanza, sede_area, params).subscribe(res => {
        this.data = res.data.data;
        this.pagination.sizeListData = res.data && res.data.total || 0;
        this.pagination.sizePage = res.data && res.data.per_page || 0;
        if (this.pagination.sizeListData < this.data.length) {
          this.pagination.isDisabledPage = true;
        } else {
          this.pagination.isDisabledPage = false;
        }
        this.data.map((m: any) => {
              if(m.topics.length === 0){
                m.guion = '-'
              }
              return m.topics.map((t: any) => {
                t.elemento_total = t.total;
              })
        })
             if(res.success){
               this.success = true;
               this.maxValorTopcis = [];
               this.elementsSession(this.data);


             }
    }, ()=> {this.loading = false}, () => {this.loading = false})
  }
  elementsSession(item: any){
    const arr: any = [];
    item.forEach((m: any) => {
      arr.push(m.topics.length);
    })
    //capturamos el maximo valor del arr
    let topicsLength = Math.max(...arr)
    this.topicsLengthgMaxValor = topicsLength
    for (let i = 0; i < topicsLength; i++) {
      this.maxValorTopcis.push(i)
    }
    item.map((m: any) => {
      //Esto es para calcular la diferencia del topic mayor con los demas topics.
      let topics_diff = this.topicsLengthgMaxValor  - m.topics.length;
      //los guiones que se pondran en los topics
        m.td_guiones = 0
      if(m.topics.length !== 0){
        m.td_guiones = [];

        for (let i = 0; i < topics_diff; i++) {
          m.td_guiones.push(i);
        }
      }
    })

  }
}
