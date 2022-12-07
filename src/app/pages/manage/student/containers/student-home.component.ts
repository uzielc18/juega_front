import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { GeneralService } from '../../../../providers';
import { END_POINTS } from '../../../../providers/utils';
import { EditUserComponent } from '../../../../shared/components/edit-user/edit-user.component';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss'],
})
export class StudentHomeComponent implements OnInit {
  loading: boolean = false;
  formHeader: any = FormGroup;
  listStudents: any = [];
  facultades:any = [];
  nivelEnsenanza: any = [];
  sedes: any = [];
  todos: any = [];
  selectedItem2 = this.todos;
  ciclos = [
    { ciclo: '1' },
    { ciclo: '2' },
    { ciclo: '3' },
    { ciclo: '4' },
    { ciclo: '5' },
    { ciclo: '6' },
    { ciclo: '7' },
    { ciclo: '8' },
    { ciclo: '9' },
    { ciclo: '10' },
    { ciclo: '11' },
    { ciclo: '12' },
    { ciclo: '13' },
    { ciclo: '14' },
  ];
  selectedItem = 20;
  pagination: any = {
    page: 1,
    per_page: 20,
    sizePage: 0,
    sizeListData: 0,
    isDisabledPage: false,
  };
  pagesCount: any[] = [20, 30, 50, 100, 200, 300, 500, 1000];
  litProgramStudy: any = [];

  constructor(
    private generalServi: GeneralService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.fieldReactive();
    this.getStudents();
    this.listSedes();
    //this.getFacultadesUnidades();
  }

  private fieldReactive() {
    const controls = {
      programa_estudio_id: [''],
      ciclo: [''],
      facultades_unidades: [{ value: '', disabled: true }],
      buscar: [''],
      nivel_ensenanza:[{ value: '', disabled: true }],
      sede:[''],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.getProgramStudy();
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
    this.generalServi.nameAll$(serviceName).subscribe(
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
  selectedSede(sede: any) {
    this.formHeader.controls['sede'].setValue(sede);
    this.formHeader.controls['nivel_ensenanza'].enable();
    this.nivelEnsenanza = [];
    this.facultades = [];
    this.formHeader.controls['nivel_ensenanza'].setValue('');
    this.formHeader.controls['facultades_unidades'].setValue('');
    this.formHeader.controls['programa_estudio_id'].setValue();
    this.listNivelEnsenanza(sede.id);
  }
  listNivelEnsenanza(sede_id: any) {
    const serviceName = END_POINTS.base_back.nivel_ensenanza;
    if (this.sedes.length > 0) {
      this.loading = true;
      this.generalServi.nameId$(serviceName, sede_id).subscribe(
        (res: any) => {
          this.nivelEnsenanza = res.data || [];
          this.todos = '';
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
  selectedNivel(nivel: any) {
    this.formHeader.controls['nivel_ensenanza'].setValue(nivel);
    this.formHeader.controls['facultades_unidades'].enable();
    this.facultades = [];
    this.formHeader.controls['facultades_unidades'].setValue('');
    this.formHeader.controls['programa_estudio_id'].setValue();
    this.getFacultadesUnidades(nivel.id, this.formHeader.get('sede').value.id);
  }
  getFacultadesUnidades(nivel: any, sedeId: any){
    const serviceName = END_POINTS.base_back.sede_areas;
    const params = {
      all: 1
    }
    this.loading = true;
    this.generalServi.nameIdAndIdParams$(serviceName, nivel, sedeId, params).subscribe(
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
  selecFacultades(item:any){
    this.formHeader.controls['facultades_unidades'].setValue(item);
    this.litProgramStudy = [];
    this.formHeader.controls['programa_estudio_id'].setValue('');
    this.listProgramEstudy(item.nivel_ensenanza_id, this.rolSemestre.area.sede_id, item.id)
  }
  listProgramEstudy( id_nive_enseanza:any, id_sede:any, id_area:any){
    this.loading = true
    const serviceName = 'list-programa-estudios';
    const params = {
      programa_estudio_id: this.rolSemestre.area.programa_estudio_id,
    }
    if (id_sede && id_nive_enseanza) {
      this.generalServi.nameIdAndIdAndIdParams$(serviceName, id_nive_enseanza, id_sede, id_area, params).subscribe((res:any) => {
        this.litProgramStudy = res.data || [];
        const arr: any = [];
        let todoss: any;
        this.litProgramStudy.forEach((f: any) => {
          arr.push(f.id)
        })
        todoss = arr.join(',');
        this.todos = todoss;
        if (this.litProgramStudy.length>0) {
          this.litProgramStudy.map((r:any) => {
            r.name_programa_estudio = r.nombre_corto + ' - ' + (r.sede_nombre ? r.sede_nombre : '');
            if (r.semiprecencial_nombre) {
              r.name_programa_estudio = r.nombre_corto + ' (' + r.sede_nombre + ' - ' + r.semiprecencial_nombre + ' )';
            }
          })
          // this.getZoom();
        }
      }, () => {this.loading = false}, () => {this.loading = false});

    }
  }

  getProgramStudy() {
    const serviceName = 'list-programa-estudios';
    const ids = {
      nivel_ensenanza_id: this.rolSemestre.area.nivel_ensenanza_id,
      sede_id: this.rolSemestre.area.sede_id,
      area_id: this.rolSemestre.area.area_id,
    };
    const params = {
      programa_estudio_id: this.rolSemestre.area.programa_estudio_id,
    }
    if (ids && ids.sede_id && ids.nivel_ensenanza_id) {
      if(ids.area_id !== 0){
        this.generalServi.nameIdAndIdAndIdParams$(serviceName, ids.nivel_ensenanza_id, ids.sede_id, ids.area_id, params).subscribe((res: any) => {
          this.litProgramStudy = res.data || [];
          if (this.litProgramStudy.length > 0) {
            this.litProgramStudy.map((r: any) => {
              r.name_programa_estudio = r.nombre_corto + ' - ' + (r.sede_nombre ? r.sede_nombre : '');
              if (r.semiprecencial_nombre) {
                r.name_programa_estudio =
                  r.nombre_corto + ' (' + r.sede_nombre + ' - ' + r.semiprecencial_nombre + ' )';
              }
            });
          }
        });
      }
    }
  }

  refresh() {
    this.pagination.page = 1;
    this.getStudents();
  }

  loadPage($event: any): any {
    this.pagination.page = $event;
    this.getStudents();
  }

  sizeTable($event: any): any {
    this.pagination.per_page = $event;
    this.getStudents();
  }

  getStudents() {
    const serviceName = END_POINTS.base_back.default + 'persons/list-estudiantes';
    const forms = this.formHeader.value;
    const params = {
      programa_estudio_id: forms.programa_estudio_id || '',
      ciclo: forms.ciclo || '',
      grupo: forms.grupo || '',
      per_page: this.pagination.per_page,
      page: this.pagination.page,
      paginate: 'S',
      q: forms.buscar
    };
    this.loading = true;
    this.generalServi.nameParams$(serviceName, params).subscribe(

      (res: any) => {
        let a: any = []
        this.listStudents = res.data.data || [];
        this.listStudents.map((m: any) => {
         m.canva_login = JSON.parse(m.canva_login) ;
        })
        // console.log(this.listStudents);
        this.pagination.sizeListData = (res.data && res.data.total) || 0;
        this.pagination.sizePage = (res.data && res.data.per_page) || 0;
        if (this.pagination.sizeListData < this.listStudents.length) {
          this.pagination.isDisabledPage = true;
        } else {
          this.pagination.isDisabledPage = false;
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

  editStudent(student: any) {
    this.dialogService
      .open(EditUserComponent, {
        dialogClass: 'dialog-limited-height',
        context: { user: student, rol: 'student' },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        if (result === 'ok') {
          this.getStudents();
        }
      });
  }
}
