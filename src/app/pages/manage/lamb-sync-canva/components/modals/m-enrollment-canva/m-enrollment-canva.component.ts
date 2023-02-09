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
  selectedItem = 20;
  pagination: any = {
    page: 1,
    per_page: 20,
    sizePage: 0,
    sizeListData: 0,
    isDisabledPage: false,
  };
  pagesCount: any[] = [20, 30, 50, 100];
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
    const params = {
      semester_id: forms.semestre,
      q:  this.termino.value || '',
    }
    this.loading = true;
    this.generalService.nameIdParams$(serviceName, forms.programa_estudio?.id, params).subscribe(res => {
      if(res.success){
        this.listEnrllments = res.data.matriculas;
        this.contadores = res.data.contadores;
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

}
