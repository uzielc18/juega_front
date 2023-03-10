import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../providers";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NbDialogService} from "@nebular/theme";
import {MEncuentrosComponent} from "../components/modals/m-encuentros/m-encuentros.component";
import Swal from "sweetalert2";
import {AppService} from "../../../../core";

@Component({
  selector: 'app-encuentros-home',
  templateUrl: './encuentros-home.component.html',
  styleUrls: ['./encuentros-home.component.scss']
})
export class EncuentrosHomeComponent implements OnInit {

  loading:boolean = false;
  Datas: any [] = [];
  constructor(private generalService: GeneralService,
              private dialogService: NbDialogService,
              private appUserInfo: AppService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.loading = true
    const serviceName = 'upeuencuentros';
    this.generalService.nameAll$(serviceName).subscribe(resp => {
        this.Datas = resp.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }

  open(item: any, code: any){
    this.dialogService.open(MEncuentrosComponent, {
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
    const serviceName = 'upeuencuentros'
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
