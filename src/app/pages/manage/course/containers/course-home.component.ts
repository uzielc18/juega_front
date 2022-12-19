import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbToastrService
} from '@nebular/theme';
import { AppService } from 'src/app/core';
import { GeneralService } from 'src/app/providers';
import { ConfigZoomComponent } from 'src/app/shared/components/config-zoom/config-zoom.component';
import Swal from 'sweetalert2';
import { MCourseFreeComponent } from '../components/modals/m-course-free/m-course-free.component';
import { MMatricularComponent } from '../components/modals/m-matricular/m-matricular.component';
import {MUnitSessionComponent} from "../../../../shared/components/unit-session/modal/m-unit-session.component";
import {END_POINTS} from "../../../../providers/utils";
import {Router} from "@angular/router";
import {MTutoresComponent} from "../components/modals/m-tutores/m-tutores.component";
import {MHomeTutoresComponent} from "../components/modals/m-tutores/m-home-tutores/m-home-tutores.component";
import {MSyncCanvasComponent} from "../components/modals/m-sync-canvas/m-sync-canvas.component";

@Component({
  selector: 'app-course-home',
  templateUrl: './course-home.component.html',
  styleUrls: ['./course-home.component.scss']
})
export class CourseHomeComponent implements OnInit {
  loading: boolean = false;
  formHeader: any = FormGroup;
  activateBtnCanva: boolean = false;
  listCourseZoom:any = [];
  success : any;
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
  facultades:any = [];
  nivelEnsenanza: any = [];
  sedes: any = [];
  todos: any;
  ///////////////////////////////
  private index: number = 0;
  physicalPositions = NbGlobalPhysicalPosition;
  logicalPositions = NbGlobalLogicalPosition;
  constructor(private generalServi: GeneralService, public router: Router, private formBuilder: FormBuilder, private dialogService: NbDialogService, private appUserInfo: AppService, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.fieldReactive();
    this.getSemester();
    //this.getFacultadesUnidades();
  }
  private fieldReactive() {
    const controls = {
      semester: [''],
      programa_estudio_id: [''],
      ciclo: [''],
      nombre: [''],
      facultades_unidades: [''],
      nivel_ensenanza:[{ value: '', disabled: true }],
      sede:[''],
      id_canva: ['']
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
    this.loading = true
    const serviceName = 'semesters';
      this.generalServi.nameAll$(serviceName).subscribe((res:any) => {
        this.semestrers = res.data || [];
        if (this.semestrers.length>0) {
          this.formHeader.controls['semester'].setValue(this.rolSemestre.semestre.id);
          this.listSedes()
        }
      }, () => {this.loading = false}, () => {this.loading = false});
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
    this.activateBtnCanva = false;
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
    this.activateBtnCanva = false;
    this.formHeader.controls['facultades_unidades'].setValue('');
    this.formHeader.controls['programa_estudio_id'].setValue();
    this.getFacultadesUnidades(nivel.id, this.formHeader.get('sede').value.id);
  }
  getFacultadesUnidades(nivel: any, sedeId: any){
    this.loading = true
    const serviceName = END_POINTS.base_back.sede_areas;
    const params = {
      all: 1
    }

    this.generalServi.nameIdAndIdParams$(serviceName, nivel, sedeId, params).subscribe(
      (res: any) => {
        this.facultades = res.data || [];
        this.formHeader.controls['programa_estudio_id'].setValue('');
      }, () => {this.loading = false}, () => {this.loading = false}
    );
  }
  selecFacultades(item:any){
    this.formHeader.controls['facultades_unidades'].setValue(item);
    this.litProgramStudy = [];
    this.activateBtnCanva = false;
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
  selecPrograma(item: any){
    this.formHeader.controls['id_canva'].setValue(item);
  }
  getProgramStudy() {
    const serviceName = 'list-programa-estudios';
    const ids = {
      nivel_ensenanza_id: this.rolSemestre?.area?.nivel_ensenanza_id,
      sede_id: this.rolSemestre.area.sede_id,
      area_id: this.rolSemestre.area.area_id,
    };
    const params = {
      programa_estudio_id: this.rolSemestre.area.programa_estudio_id,
    }
    if (ids && ids.sede_id && ids.nivel_ensenanza_id) {
      if(ids.area_id !== 0){
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
  }
  refresh() {
    this.pagination.page = 1;
    this.getCourseZoom();
    this.activateBtnCanva = true;
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
    this.loading = true;
    const serviceName = 'courses';
    const forms =  this.formHeader.value;
    const params = {
      programa_estudio_id: forms.programa_estudio_id || 0,
      semester_id: forms.semester || '',
      ciclo: forms.ciclo || '',
      grupo: forms.grupo || '',
      nombre: forms.nombre || '',
      per_page: this.pagination.per_page,
      page: this.pagination.page,
      paginate: 'S',
    }
      this.generalServi.nameParams$(serviceName, params).subscribe((res:any) => {
        this.listCourseZoom = res.data || [];
        this.pagination.sizeListData = res.meta && res.meta.total || 0;
        this.pagination.sizePage = res.meta && res.meta.per_page || 0;
        if (this.pagination.sizeListData < this.listCourseZoom.length) {
          this.pagination.isDisabledPage = true;
        } else {
          this.pagination.isDisabledPage = false;
        }
        if(res.success){
          this.success = true;
        }
      },() => {this.loading = false}, () =>  {this.loading = false});
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
           }, () => {this.loading = false}, () => {this.loading = false});
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
  newWindows(){
    this.router.navigate(['/pages/manage/course/new'])
  }
  openTutores(item: any){
    this.dialogService.open(MHomeTutoresComponent, {
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

  syncEstLamb(item: any, status: NbComponentStatus) {
    const serviceName = END_POINTS.base_back.config + '/get-enrollments';
    const duration = 3000
    const params = {
      semestre: this.rolSemestre.semestre.codigo || '',
      idCargCurDoc: item.id_carga_curso || '',
      id_1: '0',
      id_2: '0',
    }
    if(params && params.semestre && params.idCargCurDoc) {
      Swal.fire({
        title: 'Sincronizar',
        text: '¿ Desea sincronizar estudiantes lamb ? ',
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
          this.loading = true
          this.generalServi.nameIdAndIdAndIdAndId$(serviceName, params.semestre, params.idCargCurDoc, params.id_1, params.id_2).subscribe((res:any) => {
            if (res.success) {
              this.getCourseZoom();
              this.toastrService.info(status, `${res.message}`);
            }
          }, () => {this.loading = false}, () => {this.loading = false});
        }
      });
    }
  }
  syncSessionesLamb(item: any) {
    const serviceName = END_POINTS.base_back.config + '/silabus';
    const params = {
      semestre: this.rolSemestre.semestre.codigo || '',
      idCargCurDoc: item.id_carga_curso_docente || '',
      id_1: '0',
    }
    if(params && params.semestre && params.idCargCurDoc) {
      Swal.fire({
        title: 'Sincronizar',
        text: '¿ Desea sincronizar sesiones lamb ? ',
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
          this.loading = true;
          this.generalServi.nameIdAndIdAndId$(serviceName, params.semestre, params.idCargCurDoc, params.id_1).subscribe((res:any) => {
            if (res.success) {
              this.getCourseZoom();
            }
          }, () => {this.loading = false}, () => {this.loading = false});
        }
      });
    }
  }
  openSyncCanvasCourse(){
    const forms = this.formHeader.value;
    this.dialogService.open(MSyncCanvasComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        userInfo: this.appUserInfo.user,
        items: forms
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        //this.getCourseZoom();
      }
    });
  }
  syncCanvasCourse() {
    const serviceName = 'canva-insert-course';
    const forms = this.formHeader.value;
    const params = {
      id_canva:  forms.id_canva.id_canva,
      programa_estudio_id: forms.id_canva.id,
      semester_id: forms.semester,
      ciclo: forms.ciclo

    }
    this.loading = true;
    this.generalServi.nameParams$(serviceName, params).subscribe(res => {
      if(res.success){
        this.toastrService.info(status, `${res.message}`);
        this.getCourseZoom();
      }
    }, () => {this.loading= false}, () => {this.loading = false})
  }
}
