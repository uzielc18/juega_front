import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../providers";
import {END_POINTS} from "../../../../providers/utils";
import {NbDialogService} from "@nebular/theme";
import {MSemestersComponent} from "../components/modals/m-semesters/m-semesters.component";
import {MMenuMComponent} from "../../../manage/menus/components/modals/m-menu-m/m-menu-m.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-semesters-home',
  templateUrl: './semesters-home.component.html',
  styleUrls: ['./semesters-home.component.scss']
})
export class SemestersHomeComponent implements OnInit {

  loading: boolean = false
  semesters: any;
  constructor(private generService: GeneralService,
              private dialogService: NbDialogService ) { }

  ngOnInit(): void {
    this.getSemestres()
  }

  getSemestres(){
    this.loading = true
    const serviceName = END_POINTS.base_back.semesters
    this.generService.nameAll$(serviceName).subscribe(resp => {
      this.semesters = resp.data
      console.log(this.semesters)
    },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      })
  }

  openSemesters( item:any, code:any) {
    this.dialogService
      .open(MSemestersComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          item: item,
          code: code,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
      if (result === 'ok') {
        this.getSemestres();
      }
    });
  }
  deleteSemester(item:any){
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
           this.getSemestres();
          }
        },() => {this.loading = false;},() => {this.loading = false;});
      }
    });
  }
}
