import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../providers";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NbDialogService} from "@nebular/theme";
import {MCampeonatosComponent} from "../components/modals/m-campeonatos/m-campeonatos.component";
import Swal from "sweetalert2";
import {AppService} from "../../../../core";
import {MDisciplinasComponent} from "../../disciplinas/components/modals/m-disciplinas/m-disciplinas.component";

@Component({
  selector: 'app-campeonatos-home',
  templateUrl: './campeonatos-home.component.html',
  styleUrls: ['./campeonatos-home.component.scss']
})
export class CampeonatosHomeComponent implements OnInit {

  loading:boolean = false;
  listado: any [] = [];
  constructor(private generalService: GeneralService,
              private dialogService: NbDialogService,
              private appUserInfo: AppService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.loading = true
    const serviceName = 'upeucampeonatos';
    this.generalService.nameAll$(serviceName).subscribe(resp => {
        this.listado = resp.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }

  open(item: any, code: any){
    this.dialogService.open(MCampeonatosComponent, {
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
  addDisciplinas(item: any, code: any){
    this.dialogService.open(MDisciplinasComponent, {
      context: {
        userInfo: this.appUserInfo.user,
        campeonato: item,
        code: 'NEW'
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
    const serviceName = 'upeucampeonatos'
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
