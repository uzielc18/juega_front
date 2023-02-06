import {Component, Input, OnInit} from '@angular/core';
import {GeneralService} from "../../../../../../providers";
import {NbDialogRef, NbToastrService} from "@nebular/theme";
import {END_POINTS} from "../../../../../../providers/utils";
import Swal from "sweetalert2";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-m-teacher',
  templateUrl: './m-teacher.component.html',
  styleUrls: ['./m-teacher.component.scss']
})
export class MTeacherComponent implements OnInit {

  loadsynCanva: boolean = false;
  loading: boolean = false;
  listTeachers: any = [];
  selectedItem = 20;
  pagination: any = {
    page: 1,
    per_page: 20,
    sizePage: 0,
    sizeListData: 0,
    isDisabledPage: false,
  };
  closeAndGetInfo: boolean = false;
  termino: any = new FormControl('');
  pagesCount: any[] = [20, 30, 50, 100, 200, 300, 500, 1000];
  @Input() formHeader: any;
  @Input() teachers_I: any;
  constructor(private generalService: GeneralService,
              public activeModal: NbDialogRef<MTeacherComponent>,
              private toastrService: NbToastrService,) { }

  ngOnInit(): void {
    this.getTeachers();
  }

  closeModal() {
    if(this.loadsynCanva) {
      this.activeModal.close('ok');
    }else{
      this.activeModal.close('');
    }
  }

  getTeachers() {
    const serviceName = END_POINTS.base_back.default + 'persons/list-docentes';
    const forms = this.formHeader;
    const params = {
      programa_estudio_id: forms.programa_estudio?.id,
      per_page: this.pagination.per_page,
      page: this.pagination.page,
      paginate: 'S',
      q: this.termino.value || '',
    };
    this.loading = true;
    this.generalService.nameParams$(serviceName, params).subscribe(
      (res: any) => {
        this.listTeachers = res.data.data || [];
        this.listTeachers.map((m: any) => {
          m.canva_login = JSON.parse(m.canva_login) ;
        })
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
  loadPage($event: any): any {
    this.pagination.page = $event;
    this.getTeachers();
  }

  sizeTable($event: any): any {
    this.pagination.per_page = $event;
    this.getTeachers();
  }

  syncCanvas(){
    const serviceName = 'canva-insert-teacher';
    const forms = this.formHeader;
    const params = {
      programa_estudio_id: forms.programa_estudio?.id,
    }
    Swal.fire({
      title: 'Sincronizar',
      text: '¿ Esta seguro de sincronizar con canva ? ',
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
        this.generalService.nameParams$(serviceName, params).subscribe(res => {
          if(res.success){
            this.toastrService.info(status, `${res.message}`);
            this.activeModal.close('ok')
            this.loadsynCanva = true;
          }
        }, () => {this.loading = false}, () => {this.loading = false})
      }
    });
  }

  searchTeacher() {
    this.closeAndGetInfo = true;
    this.getTeachers();
  }
  limpiarBusqueda() {
    this.closeAndGetInfo = false;
    this.termino.setValue('');
    this.getTeachers();
  }

}
