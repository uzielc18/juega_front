
import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../providers";
import {END_POINTS} from "../../../../providers/utils";
import {NbDialogService} from "@nebular/theme";
import {MCategoriesComponent} from "../components/modals/m-categories/m-categories.component";
import {MMenuMComponent} from "../../../manage/menus/components/modals/m-menu-m/m-menu-m.component";
import Swal from "sweetalert2";
@Component({
  selector: 'app-categories',
  templateUrl: './categories-home.component.html',
  styleUrls: ['./categories-home.component.scss']
})
export class CategoriesHomeComponent implements OnInit {

  loading: boolean = false
  categories: any;
  constructor(private generService: GeneralService,
              private dialogService: NbDialogService ) { }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(){
    this.loading = true
    const serviceName = END_POINTS.base_back.categories
    this.generService.nameAll$(serviceName).subscribe(resp => {
        this.categories = resp.data
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      })
  }

  open( item:any, code:any) {
    this.dialogService
      .open(MCategoriesComponent, {
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
        this.getCategories();
      }
    });
  }

  delete(item:any){
    const serviceName = 'categories'
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
            this.getCategories();
          }
        },() => {this.loading = false;},() => {this.loading = false;});
      }
    });
  }

}

