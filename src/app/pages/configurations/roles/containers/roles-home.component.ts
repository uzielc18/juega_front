
import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../providers";
import {END_POINTS} from "../../../../providers/utils";
import {NbDialogService} from "@nebular/theme";
import {MRolesComponent} from "../components/modals/m-roles/m-roles.component";
import {MMenuMComponent} from "../../../manage/menus/components/modals/m-menu-m/m-menu-m.component";
import Swal from "sweetalert2";
@Component({
  selector: 'app-roles',
  templateUrl: './roles-home.component.html',
  styleUrls: ['./roles-home.component.scss']
})
export class RolesHomeComponent implements OnInit {

  loading: boolean = false
  roles: any;
  constructor(private generService: GeneralService,
              private dialogService: NbDialogService ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(){
    this.loading = true
    const serviceName = END_POINTS.base_back.roles
    this.generService.nameAll$(serviceName).subscribe(resp => {
        this.roles = resp.data
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      })
  }

  openRoles( item:any, code:any) {
    this.dialogService
      .open(MRolesComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          item: item,
          code:code,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
      if (result === 'ok') {
        this.getRoles();
      }
    });
  }

  delete(item:any){
    const serviceName = 'semesters'
    Swal.fire({
      title: 'Eliminar',
      text: '¿ Desea eliminar ? ',
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
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.generService.deleteNameId$(serviceName, item.id).subscribe(r => {
          if (r.success) {
            this.getRoles();
          }
        },() => {this.loading = false;},() => {this.loading = false;});
      }
    });
  }

}
