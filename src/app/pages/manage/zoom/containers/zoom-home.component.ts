import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbPopoverDirective } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { UpZoomComponent } from '../components/modals/up-zoom/up-zoom.component';
import { ZoomCourseComponent } from '../components/modals/zoom-course/zoom-course.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AppService } from 'src/app/core';
import { environment } from 'src/environments/environment';
import { EmitEventsService } from 'src/app/shared/services/emit-events.service';
import { Subscription } from 'rxjs';
import {END_POINTS} from "../../../../providers/utils";
import {MAddSalaComponent} from "../components/modals/m-add-sala/m-add-sala.component";
import {MSyncRecordingComponent} from "../components/modals/m-sync-recording/m-sync-recording.component";
@Component({
  selector: 'app-zoom-home',
  templateUrl: './zoom-home.component.html',
  styleUrls: ['./zoom-home.component.scss']
})
export class ZoomHomeComponent implements OnInit {
  loading:boolean = false;
  listZoom:any = [];
  facultades:any = [];
  semestrers:any = [];
  nivelEnsenanza: any = [];
  sedes: any = [];
  formHeader: any = FormGroup;
  listProgramStudy:any = [{
    id: '',
    nombre_corto: 'Todos',
    name_programa_estudio: 'Todos'
  }];
  public searchableList: any[] = [];
  public queryString:any;

  datosMe = this.appService;
  nombreSubscription: any = Subscription;
  // theRolSemestre:any;
  valida: boolean = false;
  constructor(private dialogService: NbDialogService, private generalServi: GeneralService, private formBuilder: FormBuilder, private router: Router,
    private appService: AppService,  private emitEventsService: EmitEventsService) {
    this.searchableList = ['correo', 'programa_estudio_nombre'];

  }

  ngOnInit(): void {
    this.fieldReactive();
    this.nombreSubscription = this.emitEventsService.returns().subscribe(value => { // para emitir evento desde la cabecera
      if (value && value.rol && value.semestre) {
        // this.theRolSemestre =  value;
        this.valida = true;
        setTimeout(() => {
          this.getZoom();
        }, 1000);
      } else {
        this.valida = false;
      }
      });
      this.recoveryValues();
      this.getSemester();
    // this.getZoom();
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
  recoveryValues() {
    this.emitEventsService.castRolSemester.subscribe(value => {
      if (value && value.rol && value.semestre && !this.valida) {
        // this.theRolSemestre =  value;
        setTimeout(() => {
          this.getZoom();
        }, 1000);
      }
    });
  }
  private fieldReactive() {
    const controls = {
      programa_estudio_id: [''],
      facultades_unidades: [''],
      semester:[''],
      sede:[''],
      nivel_ensenanza:[''],
    };
    this.formHeader = this.formBuilder.group(controls);
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
  getFacultadesUnidades(nivel: any, sedeId: any){
    const serviceName = END_POINTS.base_back.sede_areas;
    const params = {
      all: 0
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
    this.formHeader.controls['facultades_unidades'].setValue(item);
    this.listProgramStudy = [];
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
        this.listProgramStudy = res.data || [];
        if (this.listProgramStudy.length>0) {
          this.listProgramStudy.map((r:any) => {
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
    const serviceName = 'mis-programas';
    const ids = {
      person_id: this.datosMe.user.person.id || '',
    };
    if (ids && ids.person_id) {
      this.generalServi.nameId$(serviceName, ids.person_id).subscribe((res:any) => {
        this.listProgramStudy = [...this.listProgramStudy, ...res.data];
        if (this.listProgramStudy.length>0) {
          this.listProgramStudy.map((r:any) => {
            r.name_programa_estudio = r.nombre_corto + ' ' + (r.sede_nombre ? r.sede_nombre : '');
            if (r.semiprecencial_nombre) {
              r.name_programa_estudio = r.nombre_corto + ' (' + r.sede_nombre + ' - ' + r.semiprecencial_nombre + ' )';
            }
          })
          // this.getZoom();
        }
      });
    }
  }
  updateZoom(params: any) {
    const prams:any = {
      item: params,
      code: 'UPDATE',
    }
   this.openZoom(prams);
  }
  newZoom() {
    const prams:any = {
      item: '',
      code: 'NEW',
    }
   this.openZoom(prams);
  }
  openZoom(prams:any) {
    this.dialogService.open(UpZoomComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        item: prams.item,
        code: prams.code,
        datosMe: this.datosMe,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        this.getZoom();
        // this.filtrar();
      }
    });
  }
  openCourseZoom(items:any) {
    this.dialogService.open(ZoomCourseComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        item: items,
        semester: this.formHeader.value.semester
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        // this.filtrar();
      }
    });
  }
  getZoom() {
    const serviceName = 'zoomAcounts';
    this.loading = true;
    const forms = this.formHeader.value;
    const params:any = {
      programa_estudio_id: forms.programa_estudio_id || '',
      person_id: this.datosMe.user?.person?.id || '',
    };
    if (params && params.person_id) {
      this.generalServi.nameParams$(serviceName, params).subscribe((re:any) => {
        this.listZoom = re.data || [];
      }, () => { this.loading =false; }, () => { this.loading =false; });
    }
  }
  refresh() {
    this.getZoom();
  }
  vincular(){
    Swal.fire({
      title: 'Vincular',
      text: '¿ Desea vincular datos ? ',
      backdrop: true,
      icon: 'question',
      // animation: true,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#7f264a',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      // timer: 2000,
    }).then((result:any) => {
        if (result.isConfirmed) {
          location.href = `https://zoom.us/oauth/authorize?response_type=code&client_id=${environment.uri.client_id}&redirect_uri=${environment.uri.url}`;
          // location.href = 'https://zoom.us/oauth/authorize?response_type=code&client_id=vARG7XA1TQuAodHuaU8NuQ&redirect_uri=http://localhost:4200/pages/manage/zoom/validate'

        }

    });
  }
  changeSelected(event:any) {
    this.formHeader.patchValue({
      programa_estudio_id: event.value.programa_estudio_id,
    });
  }
  actualizar(item:any) {
    const serviceName = 'actualizar-cursos';
    if (item && item.id) {
      Swal.fire({
        title: 'Actualizar',
        text: '¿ Desea actualizar cursos ? ',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        // timer: 2000,
      }).then((result:any) => {
        if (result.isConfirmed) {
          this.loading = true;
          this.generalServi.nameId$(serviceName, item.id).subscribe((re:any) => {
            this.getZoom();

          }, () => { this.loading =false; }, () => { this.loading =false; });
        }
      });
    }
  }
  openAddNew(items: any){
    this.dialogService.open(MAddSalaComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        item: items,

      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        // this.filtrar();
      }
    });
  }
  openRecordingZoom(item: any) {
    this.dialogService.open(MSyncRecordingComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        item: item,
        semester: this.formHeader.value.semester
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        // this.filtrar();
      }
    });
  }

}
