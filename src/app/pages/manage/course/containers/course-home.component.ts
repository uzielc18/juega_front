import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { AppService } from 'src/app/core';
import { GeneralService } from 'src/app/providers';
import { ConfigZoomComponent } from 'src/app/shared/components/config-zoom/config-zoom.component';
import Swal from 'sweetalert2';
import { MCourseFreeComponent } from '../components/modals/m-course-free/m-course-free.component';
import { MMatricularComponent } from '../components/modals/m-matricular/m-matricular.component';
import {MUnitSessionComponent} from "../../../../shared/components/unit-session/modal/m-unit-session.component";

@Component({
  selector: 'app-course-home',
  templateUrl: './course-home.component.html',
  styleUrls: ['./course-home.component.scss']
})
export class CourseHomeComponent implements OnInit {
  loading: boolean = false;
  formHeader: any = FormGroup;
  listCourseZoom:any = [];
  ciclos = [{ciclo: '1'}, {ciclo:'2'}, {ciclo:'3'}, {ciclo:'4'}, {ciclo:'5'}, {ciclo:'6'}, {ciclo:'7'}, {ciclo:'8'}, {ciclo:'9'}, {ciclo:'10'}, {ciclo:'11'}, {ciclo:'12'}, {ciclo:'13'}, {ciclo:'14'}];
  selectedItem = 20;
  pagination: any = {
    page: 1,
    per_page: 20,
    sizePage: 0,
    sizeListData: 0,
    isDisabledPage: false,
  };
  pagesCount: any[] = [20, 30, 50, 100, 200, 300, 500, 1000];
  litProgramStudy:any = [];
  semestrers:any = [];
  constructor(private generalServi: GeneralService, private formBuilder: FormBuilder, private dialogService: NbDialogService, private appUserInfo: AppService) { }

  ngOnInit(): void {
    this.fieldReactive();
    this.getSemester();
  }
  private fieldReactive() {
    const controls = {
      semester: [''],
      programa_estudio_id: [''],
      ciclo: [''],
      nombre: ['']
    };
    this.formHeader = this.formBuilder.group(controls);
    this.getProgramStudy();
  }
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    const val = JSON.parse(sesion);
    if (val && val.rol){
      return val;
    } else {
      return '';
    }
  }
  getSemester() {
    const serviceName = 'semesters';
      this.generalServi.nameAll$(serviceName).subscribe((res:any) => {
        this.semestrers = res.data || [];
        if (this.semestrers.length>0) {
          this.formHeader.controls['semester'].setValue(this.rolSemestre.semestre.id);
          this.getCourseZoom();
        }
      });
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
      this.generalServi.nameIdAndIdAndIdParams$(serviceName, ids.nivel_ensenanza_id, ids.sede_id, ids.area_id, params).subscribe((res:any) => {
        this.litProgramStudy = res.data || [];
        if (this.litProgramStudy.length>0) {
          this.litProgramStudy.map((r:any) => {
            r.name_programa_estudio = r.nombre_corto + ' - ' + (r.sede_nombre ? r.sede_nombre : '');
            if (r.semiprecencial_nombre) {
              r.name_programa_estudio = r.nombre_corto + ' (' + r.sede_nombre + ' - ' + r.semiprecencial_nombre + ' )';
            }
          })
          // this.getZoom();
        }
      });
    }
  }
  refresh() {
    this.pagination.page = 1;
    this.getCourseZoom();
  }
  loadPage($event: any): any {
    this.pagination.page = $event;
    this.getCourseZoom();
  }
  sizeTable($event: any): any {
    this.pagination.per_page = $event;
    this.getCourseZoom();
  }
  keyNombre($event:any) {
    if (!this.formHeader.value.nombre) {
      this.pagination.page = 1;
      this.getCourseZoom();
    }
  }
  getCourseZoom() {
    const serviceName = 'courses';
    const forms =  this.formHeader.value;
    const params = {
      programa_estudio_id: forms.programa_estudio_id || 1,
      semester_id: forms.semester || '',
      ciclo: forms.ciclo || '',
      grupo: forms.grupo || '',
      nombre: forms.nombre || '',
      per_page: this.pagination.per_page,
      page: this.pagination.page,
      paginate: 'S',
    }
      this.loading = true;
      this.generalServi.nameParams$(serviceName, params).subscribe((res:any) => {
        this.listCourseZoom = res.data || [];
        this.pagination.sizeListData = res.meta && res.meta.total || 0;
        this.pagination.sizePage = res.meta && res.meta.per_page || 0;
        if (this.pagination.sizeListData < this.listCourseZoom.length) {
          this.pagination.isDisabledPage = true;
        } else {
          this.pagination.isDisabledPage = false;
        }
      }, () => {this.loading = false}, () => {this.loading = false});
  }
  openConfig(items:any) {
    this.dialogService.open(ConfigZoomComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        datos: items,

      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        this.getCourseZoom();
      }
    });
  }
  openMatricula(items:any) {
    this.dialogService.open(MMatricularComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        item: items,

      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        this.getCourseZoom();
      }
    });
  }
  openCoursesFree(item:any, code:any) {
    this.dialogService.open(MCourseFreeComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        userInfo: this.appUserInfo.user,
        semestre: this.semestrers.find((r:any) => r.id === Number(this.formHeader.value.semester)),
        rolSemestre: this.rolSemestre,
        items: item,
        code: code,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        this.getCourseZoom();
      }
    });
  }
  deleteCurso(item:any) {
    const serviceName = 'courses';
    Swal.fire({
      title: 'ELIMINAR',
      text: '¿ Desea eliminar el curso ? ',
      backdrop: true,
      icon: 'question',
      // animation: true,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#00244E',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      // timer: 2000,
    }).then((result:any) => {
        if (result.isConfirmed) {
          this.generalServi.deleteNameId$(serviceName, item.id).subscribe((res:any) => {
            if (res.success) {
              this.getCourseZoom();
            }
           });
          }
        });
  }
  openUnitSession(item:any) {
    this.dialogService.open(MUnitSessionComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        userInfo: this.appUserInfo.user,
        items: item
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        this.getCourseZoom();
      }
    });
  }
}
