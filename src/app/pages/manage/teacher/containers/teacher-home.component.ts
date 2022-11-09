import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { GeneralService } from '../../../../providers';
import { END_POINTS } from '../../../../providers/utils';
import { EditUserComponent } from '../../../../shared/components/edit-user/edit-user.component';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss'],
})
export class TeacherHomeComponent implements OnInit {
  loading: boolean = false;
  formHeader: any = FormGroup;
  listTeachers: any = [];
  facultades:any = [];
  sedes: any = [];
  todos: any = 0;
  // @ts-ignore
  //selectedProgramaStudy: any = this.todos;
  nivelEnsenanza: any = [];

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
    this.getProgramStudy();
    this.fieldReactive();
   // this.getTeachers();
   // this.getFacultadesUnidades();
    this.listSedes();
  }

  private fieldReactive() {
    const controls = {
      programa_estudio_id: [''],
      ciclo: [''],
      facultades_unidades: [{ value: '', disabled: true }, [Validators.required]],
      buscar: [''],
      nivel_ensenanza:[{ value: '', disabled: true }, [Validators.required]],
      sede:['', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
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
    console.log(item, "facultades")
    this.formHeader.controls['facultades_unidades'].setValue(item);
    this.litProgramStudy = [];
    this.formHeader.controls['programa_estudio_id'].setValue(this.todos);
    this.listProgramEstudy(item.nivel_ensenanza_id, this.formHeader.get('sede').value.id, item.id)
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
        this.todos = todoss
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
    const serviceName = END_POINTS.base_back.programa_estudios;
    const ids = {
      nivel_ensenanza_id: this.rolSemestre.area.nivel_ensenanza_id || '',
      sede_id: this.rolSemestre.area.sede_id || '',
      area_id: this.rolSemestre.area.area_id || '',
    };
    this.loading = true;
    if (ids && ids.nivel_ensenanza_id && ids.sede_id && ids.area_id) {
      if(ids.area_id !== 0) {
        this.generalServi.nameIdAndIdAndId$(serviceName, ids.nivel_ensenanza_id, ids.sede_id, ids.area_id)
          .subscribe((res: any) => {
            this.litProgramStudy = res.data || [];
            if (this.litProgramStudy.length > 0) {
              this.litProgramStudy.map((r: any) => {
                r.name_programa_estudio = r.nombre_corto + ' ' + (r.sede_nombre ? r.sede_nombre : '');
                if (r.semiprecencial_nombre) {
                  r.name_programa_estudio =
                    r.nombre_corto + ' (' + r.sede_nombre + ' - ' + r.semiprecencial_nombre + ' )';
                }
              });
            }
          }, () => {
            this.loading = false;
          }, () => {
            this.loading = false;
          });
      }
    }
  }

  refresh() {
    this.pagination.page = 1;
    this.getTeachers();
  }

  loadPage($event: any): any {
    this.pagination.page = $event;
    this.getTeachers();
  }

  sizeTable($event: any): any {
    this.pagination.per_page = $event;
    this.getTeachers();
  }

  getTeachers() {
    const serviceName = END_POINTS.base_back.default + 'persons/list-docentes';
    const forms = this.formHeader.value;
    const params = {
      programa_estudio_id: forms.programa_estudio_id || '',
      ciclo: forms.ciclo || '',
      grupo: forms.grupo || '',
      per_page: this.pagination.per_page,
      page: this.pagination.page,
      paginate: 'S',
      q: forms.buscar || ''
    };
    this.loading = true;
    this.generalServi.nameParams$(serviceName, params).subscribe(
      (res: any) => {
        this.listTeachers = res.data.data || [];
        this.pagination.sizeListData = (res.data && res.data.total) || 0;
        this.pagination.sizePage = (res.data && res.data.per_page) || 0;
        if (this.pagination.sizeListData < this.listTeachers.length) {
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

  editTeacher(teacher: any) {
    this.dialogService
      .open(EditUserComponent, {
        dialogClass: 'dialog-limited-height',
        context: { user: teacher, rol: 'teacher' },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        if (result === 'ok') {
          this.getTeachers();
        }
      });
  }
}
