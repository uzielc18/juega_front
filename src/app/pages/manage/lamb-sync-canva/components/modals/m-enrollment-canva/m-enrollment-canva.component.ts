import {Component, Input, OnInit} from '@angular/core';
import {GeneralService} from "../../../../../../providers";
import {NbDialogRef, NbToastrService} from "@nebular/theme";
import {FormControl} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-m-enrollment-canva',
  templateUrl: './m-enrollment-canva.component.html',
  styleUrls: ['./m-enrollment-canva.component.scss']
})
export class MEnrollmentCanvaComponent implements OnInit {

  loading: boolean = false;
  closeAndGetInfo: boolean = false;
  termino: any = new FormControl('');

  listEnrllments: any = [];
  contadores: any;
  selectedItem = 100;
  estado_canva: any;
  pagination: any = {
    page: 1,
    per_page: 100,
    sizePage: 0,
    sizeListData: 0,
    isDisabledPage: false,
  };
  pagesCount: any[] = [100, 150, 200, 250];
  @Input() formHeader: any;
  constructor(private generalService: GeneralService,
              public activeModal: NbDialogRef<MEnrollmentCanvaComponent>,
              private toastrService: NbToastrService,) { }

  ngOnInit(): void {
    this.getListEnrollments();
  }

  getListEnrollments () {
    const serviceName = 'list-enrollments-programa';
    const forms = this.formHeader;
    const params: any = {
      semester_id: forms.semestre,
      q:  this.termino.value || '',
      per_page: this.pagination.per_page,
      page: this.pagination.page,
      paginate: 'S',
    }
    if(this.estado_canva == 2){
      params.estado_canva = this.estado_canva;
    }
    this.loading = true;
    this.generalService.nameIdParams$(serviceName, forms.programa_estudio?.id, params).subscribe(res => {
      if(res.success){
        this.listEnrllments = res.data.matriculas.data;
        this.listEnrllments.map((m: any) => {
          if(m.c_id_canva === null && m.p_id_canva === null) {
            m.color_error = '#F6DADE'
          }
          if(m.c_id_canva === null && m.p_id_canva !== null) {
            m.color_error = '#EEC7A1'
          }
          if(m.p_id_canva === null && m.c_id_canva !== null) {
            m.color_error = '#FBF7B8'
          }
        })
        this.contadores = res.data.contadores;
        this.pagination.sizeListData = res.data.matriculas && res.data.matriculas.total || 0;
        this.pagination.sizePage = res.data.matriculas && res.data.matriculas.per_page || 0;
        this.pagination.isDisabledPage = this.pagination.sizeListData < this.listEnrllments.length;
      }

    }, () => {this.loading = false}, ()=> {this.loading = false})
  }

  closeModal() {
    this.activeModal.close('');
  }

  loadPage($event: any): any {
    this.pagination.page = $event;
    this.getListEnrollments();

  }
  sizeTable($event: any): any {
    this.pagination.per_page = $event;
    this.getListEnrollments();
  }

  syncCanvasEnrrollemnt() {
    const serviceName = 'canva-insert-enrollment';
    const forms = this.formHeader;
    const params = {
      semester_id: forms.semestre,
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
        this.generalService.nameIdParams$(serviceName, forms.programa_estudio?.id, params).subscribe(res => {
          if(res.success){
            this.toastrService.info(status, `${res.message}`);
            this.getListEnrollments();
          }
        }, () => {this.loading= false}, () => {this.loading = false})
      }
    });
  }
  limpiarBusqueda() {
    this.closeAndGetInfo = false;
    this.termino.setValue('');
    this.getListEnrollments();
  }
  searchEnrollement() {
    this.closeAndGetInfo = true;
    this.getListEnrollments();
  }
  allSync() {
    this.estado_canva = 2;
    this.getListEnrollments();
  }
  refresh() {
    this.estado_canva = '';
    this.getListEnrollments();
  }

}
