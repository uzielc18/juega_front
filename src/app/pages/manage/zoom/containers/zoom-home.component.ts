import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { UpZoomComponent } from '../components/modals/up-zoom/up-zoom.component';
import { ZoomCourseComponent } from '../components/modals/zoom-course/zoom-course.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
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
  constructor(private dialogService: NbDialogService, private generalServi: GeneralService, private formBuilder: FormBuilder, private router: Router) {
    this.searchableList = ['correo', 'programa_estudio_nombre'];
  }

  ngOnInit(): void {
    this.fieldReactive();
    this.getZoom();
  }
  private fieldReactive() {
    const controls = {
      programa_estudio_id: [''],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.getProgramStudy();
  }
  getProgramStudy() {
    const serviceName = 'programaEstudios';
    this.generalServi.nameAll$(serviceName).subscribe((res:any) => {
      this.listProgramStudy = res.data || [];
    });
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
      programa_estudio_id: forms.programa_estudio_id,
    };
    this.generalServi.nameParams$(serviceName, params).subscribe((re:any) => {
      this.listZoom = re.data || [];
    }, () => { this.loading =false; }, () => { this.loading =false; });
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
          location.href = 'https://zoom.us/oauth/authorize?response_type=code&client_id=vARG7XA1TQuAodHuaU8NuQ&redirect_uri=http://localhost:4200/pages/manage/zoom/validate';
          // this.router.navigate([`https://zoom.us/oauth/authorize?response_type=code&client_id=vARG7XA1TQuAodHuaU8NuQ&redirect_uri=http://localhost:4200/pages/manage/zoom/validate`]);
          // const url = 'https://zoom.us/oauth/authorize?response_type=code&client_id=vARG7XA1TQuAodHuaU8NuQ&redirect_uri=http://localhost:4200/pages/manage/zoom/validate';
          // window.open(url, '_blank');
          // console.log('ok');
          
        }
      
    });
  }
}
