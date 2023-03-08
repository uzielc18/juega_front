import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../../providers";
import Swal from "sweetalert2";
import {NbDialogService} from "@nebular/theme";
import {MTypeRatingsComponent} from "../../components/modals/m-type-ratings/m-type-ratings.component";
import {AppService} from "../../../../../core";

@Component({
  selector: 'app-type-ratings-home',
  templateUrl: './type-ratings-home.component.html',
  styleUrls: ['./type-ratings-home.component.scss']
})
export class TypeRatingsHomeComponent implements OnInit {

  loading:boolean = false
  typeRatinsData: any [] = []
  constructor(private generalService: GeneralService,
              private dialogService: NbDialogService,
              private appUserInfo: AppService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.loading = true
    const serviceName = 'typeRatings';
    this.generalService.nameAll$(serviceName).subscribe(resp => {
      this.typeRatinsData = resp.data
    }, () => {this.loading = false}, () => {this.loading = false})
  }

  openTypeRanting(item: any, code: any){
    this.dialogService
      .open(MTypeRatingsComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          userInfo: this.appUserInfo.user,
          item: item,
          code: code,
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
  deleteTypeRatings(item: any){
    const serviceName = 'typeRatings'
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
