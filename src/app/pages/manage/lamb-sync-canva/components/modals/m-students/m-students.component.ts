import {Component, Input, OnInit} from '@angular/core';
import {GeneralService} from "../../../../../../providers";
import {NbDialogRef, NbToastrService} from "@nebular/theme";
import {END_POINTS} from "../../../../../../providers/utils";
import Swal from "sweetalert2";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-m-students',
  templateUrl: './m-students.component.html',
  styleUrls: ['./m-students.component.scss']
})
export class MStudentsComponent implements OnInit {

  loading: boolean = false;
  closeAndGetInfo: boolean = false;
  listStudents: any = [];
  selectedItem = 20;
  termino: any = new FormControl('');
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
              public activeModal: NbDialogRef<MStudentsComponent>,
              private toastrService: NbToastrService,) { }

  ngOnInit(): void {
    this.getStudents();
  }
  closeModal() {
    this.activeModal.close('');
  }

  getStudents() {
    const serviceName = END_POINTS.base_back.default + 'persons/list-estudiantes';
    const forms = this.formHeader;
    console.log(forms)
    const params = {
      programa_estudio_id: forms.programa_estudio?.id,
      per_page: this.pagination.per_page,
      page: this.pagination.page,
      paginate: 'S',
      q: this.termino.value,
    };
    this.loading = true;
    this.generalService.nameParams$(serviceName, params).subscribe(

      (res: any) => {
        let a: any = []
        this.listStudents = res.data.data || [];
        this.listStudents.map((m: any) => {
          m.canva_login = JSON.parse(m.canva_login);
          m.activateEdit = false
        })
        // console.log(this.listStudents);
        this.pagination.sizeListData = (res.data && res.data.total) || 0;
        this.pagination.sizePage = (res.data && res.data.per_page) || 0;
        if (this.pagination.sizeListData < this.listStudents.length) {
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
    this.getStudents();
  }
  sizeTable($event: any): any {
    this.pagination.per_page = $event;
    this.getStudents();
  }
  syncCanvas(){
    const serviceName = 'canva-insert-student';
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
          }
        }, () => {this.loading = false}, () => {this.loading = false})
      }
    });
  }
  searchEstudent() {
    this.closeAndGetInfo = true;
    this.getStudents();
  }
  limpiarBusqueda() {
    this.closeAndGetInfo = false;
    this.termino.setValue('');
    this.getStudents();
  }
  activateEditFunction(acti: any) {
    this.listStudents.forEach((f: any) => {
      f.activateEdit = false

    })
    this.listStudents.find((f: any) => {
      if (f.id === acti.id) {
        acti.activateEdit = true
      }
    })

  }
  accepEdit(item: any) {
    const serviceName = 'users';
    const data = {
      correo_upeu: item.correo_upeu,
    }
    this.loading = true
    this.generalService.updateNameIdData$(serviceName, item.user_id, data).subscribe(res => {

      if(res.success){
        this.listStudents.find((f: any) => {
          if (f.id === item.id) {
            item.activateEdit = false
          }
        })
      }

    }, () => {this.loading = false}, () => {this.loading = false})
  }
  updateStudentCanva() {
    const serviceName = 'canva-update-student';
    this.loading = true;
    Swal.fire({
      title: 'Actualizar',
      text: '¿ Esta seguro de actualizar información en canva? ',
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
        this.generalService.nameAll$(serviceName).subscribe(res => {
          if(res.success) {
            this.getStudents()
          }
        },() => {this.loading = false}, () => {this.loading = false})
      }
    });

  }
  updateUsers() {
    const serviceName = 'canva-update-users-student';
    this.loading = true;
    this.generalService.nameAll$(serviceName).subscribe(res => {
      if(res.success) {
        this.getStudents()
      }

    }, () => {this.loading = false}, () => {this.loading = false})

  }
  updateLogins() {
    const serviceName = 'canva-update-logins-student';
    this.loading = true;
    this.generalService.nameAll$(serviceName).subscribe(res => {
      if(res.success) {
        this.getStudents()
      }
    }, () => {this.loading = false}, () => {this.loading = false})
  }
  passwordReset(item: any) {
    const serviceName = 'canva-update-login';
    Swal.fire({
      title: 'Restablecer contraseña',
      text: '¿ Esta seguro de restablecer contraseña ? ',
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
        this.generalService.nameId$(serviceName, item.person_id).subscribe(res => {
          if(res.success){
          }
        }, () => {this.loading = false}, () => {this.loading = false})
      }
    });
  }

}
