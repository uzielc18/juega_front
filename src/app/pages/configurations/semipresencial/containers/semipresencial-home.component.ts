import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../providers";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NbDialogService} from "@nebular/theme";
import {MSemipresencialComponent} from "../components/modals/m-semipresencial/m-semipresencial.component";
import Swal from "sweetalert2";
import {AppService} from "../../../../core";

@Component({
  selector: 'app-semipresencial-home',
  templateUrl: './semipresencial-home.component.html',
  styleUrls: ['./semipresencial-home.component.scss']
})
export class SemipresencialHomeComponent implements OnInit {

  loading:boolean = false;
  semipresencialData: any [] = [];
  constructor(private generalService: GeneralService,
              private dialogService: NbDialogService,
              private appUserInfo: AppService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.loading = true
    const serviceName = 'semipresencials';
    this.generalService.nameAll$(serviceName).subscribe(resp => {
        this.semipresencialData = resp.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }

  open(item: any, code: any){
    this.dialogService.open(MSemipresencialComponent, {
      context: {
        userInfo: this.appUserInfo.user,
        item: item,
        code: code
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe(resp => {
        if(resp === 'ok'){
          this.getData();
        }
    })

  }
  delete(item: any){
    const serviceName = 'semipresencials'
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
