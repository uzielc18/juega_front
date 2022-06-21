import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../providers";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NbDialogService} from "@nebular/theme";
import {MTypeElementsComponent} from "../components/modals/m-type-elements/m-type-elements.component";
import Swal from "sweetalert2";
import {AppService} from "../../../../core";

@Component({
  selector: 'app-type-elements-home',
  templateUrl: './type-elements-home.component.html',
  styleUrls: ['./type-elements-home.component.scss']
})
export class TypeElementsHomeComponent implements OnInit {

  loading:boolean = false;
  typeElementsData: any [] = [];
  constructor(private generalService: GeneralService,
              private dialogService: NbDialogService,
              private appUserInfo: AppService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.loading = true
    const serviceName = 'typeElements';
    this.generalService.nameAll$(serviceName).subscribe(resp => {
        this.typeElementsData = resp.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }

  openTypeElement(item: any, code: any){
    this.dialogService.open(MTypeElementsComponent, {
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
  deleteTypeElement(item: any){
    const serviceName = 'typeElements'
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
