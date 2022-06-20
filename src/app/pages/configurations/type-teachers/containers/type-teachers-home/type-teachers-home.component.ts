import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../../providers";
import {MSemestersComponent} from "../../../semesters/components/modals/m-semesters/m-semesters.component";
import {NbDialogService} from "@nebular/theme";
import Swal from "sweetalert2";
import {AppService} from "../../../../../core";
import {MTypeTeachersComponent} from "../../components/modals/m-type-teachers/m-type-teachers.component";

@Component({
  selector: 'app-type-teachers-home',
  templateUrl: './type-teachers-home.component.html',
  styleUrls: ['./type-teachers-home.component.scss']
})
export class TypeTeachersHomeComponent implements OnInit {

  loading:boolean = false
  typeTeacherData: any [] = [];
  constructor( private generalService: GeneralService,
               private dialogService: NbDialogService,
               private appUserInfo: AppService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.loading = true;
    const nameService = 'typeTeachers';
    this.generalService.nameAll$(nameService).subscribe(resp => {
      this.typeTeacherData = resp.data
    },()=> this.loading = false, () => {this.loading = false});
  }

  openTypeTeacher(item: any, code: any){
    this.dialogService
      .open(MTypeTeachersComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          item: item,
          code: code,
          userInfo: this.appUserInfo.user,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
      if (result === 'ok') {
        this.getData();
      }
    });

  }
  deleteTypeTeacher(item:any){
    const serviceName = 'typeTeachers'
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
        this.generalService.deleteNameId$(serviceName, item.id).subscribe(r => {
          if (r.success) {
            this.getData();
          }
        },() => {this.loading = false;},() => {this.loading = false;});
      }
    });
  }

}
