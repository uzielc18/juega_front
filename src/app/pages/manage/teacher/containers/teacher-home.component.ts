import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    this.getTeachers();
  }

  private fieldReactive() {
    const controls = {
      programa_estudio_id: [''],
      ciclo: [''],
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

  getProgramStudy() {
    const serviceName = END_POINTS.base_back.programa_estudios;
    const ids = {
      nivel_ensenanza_id: this.rolSemestre.area.nivel_ensenanza_id || '',
      sede_id: this.rolSemestre.area.sede_id || '',
      area_id: this.rolSemestre.area.area_id || '',
    };
    this.loading = true;
    if (ids && ids.nivel_ensenanza_id && ids.sede_id && ids.area_id) {
      this.generalServi
        .nameIdAndIdAndId$(serviceName, ids.nivel_ensenanza_id, ids.sede_id, ids.area_id)
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
        }, () => { this.loading = false; }, () => { this.loading = false; });
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
