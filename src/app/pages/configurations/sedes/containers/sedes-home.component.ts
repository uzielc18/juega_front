import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../providers";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NbDialogService} from "@nebular/theme";
import {MSedesComponent} from "../components/modals/m-sedes/m-sedes.component";
import Swal from "sweetalert2";
import {AppService} from "../../../../core";

@Component({
  selector: 'app-sedes-home',
  templateUrl: './sedes-home.component.html',
  styleUrls: ['./sedes-home.component.scss']
})
export class SedesHomeComponent implements OnInit {

  loading:boolean = false;
  sedesData: any [] = [];
  constructor(private generalService: GeneralService,
              private dialogService: NbDialogService,
              private appUserInfo: AppService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.loading = true
    const serviceName = 'sedes';
    this.generalService.nameAll$(serviceName).subscribe(resp => {
        this.sedesData = resp.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }

  open(item: any, code: any){
    this.dialogService.open(MSedesComponent, {
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
    const serviceName = 'sedes'
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
