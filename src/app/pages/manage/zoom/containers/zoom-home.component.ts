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
@Component({
  selector: 'app-zoom-home',
  templateUrl: './zoom-home.component.html',
  styleUrls: ['./zoom-home.component.scss']
})
export class ZoomHomeComponent implements OnInit {
  loading:boolean = false;
  listZoom:any = [];
  formHeader: any = FormGroup;
  listProgramStudy:any = [];
  public searchableList: any[] = [];
  public queryString:any;

  datosMe = this.appService;

  constructor(private dialogService: NbDialogService, private generalServi: GeneralService, private formBuilder: FormBuilder, private router: Router,
    private appService: AppService) {
    this.searchableList = ['correo', 'programa_estudio_nombre'];

  }

  ngOnInit(): void {
    this.fieldReactive();
    this.getProgramStudy();
    // this.getZoom();
  }
  private fieldReactive() {
    const controls = {
      programa_estudio_id: [''],
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
  getProgramStudy() {
    const serviceName = 'mis-programas';
    const ids = {
      person_id: this.datosMe.user.id || '',
    };
    if (ids && ids.person_id) {
      this.generalServi.nameId$(serviceName, ids.person_id).subscribe((res:any) => {
        this.listProgramStudy = res.data || [];
        if (this.listProgramStudy.length>0) {
          this.listProgramStudy.map((r:any) => {
            r.name_programa_estudio = r.nombre_corto + ' ' + (r.sede_nombre ? r.sede_nombre : '');
            if (r.semiprecencial_nombre) {
              r.name_programa_estudio = r.nombre_corto + ' (' + r.sede_nombre + ' - ' + r.semiprecencial_nombre + ' )';
            }
          })
          this.getZoom();
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
      person_id: this.datosMe.user.id || '',
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
          location.href = 'https://zoom.us/oauth/authorize?response_type=code&client_id=vARG7XA1TQuAodHuaU8NuQ&redirect_uri=' + environment.uri;
          // this.router.navigate([`https://zoom.us/oauth/authorize?response_type=code&client_id=vARG7XA1TQuAodHuaU8NuQ&redirect_uri=http://localhost:4200/pages/manage/zoom/validate`]);
          // const url = 'https://zoom.us/oauth/authorize?response_type=code&client_id=vARG7XA1TQuAodHuaU8NuQ&redirect_uri=http://localhost:4200/pages/manage/zoom/validate';
          // window.open(url, '_blank');
          // console.log('ok');
          
        }
      
    });
  }
 
}
