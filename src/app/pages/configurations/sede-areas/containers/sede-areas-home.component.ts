import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../providers";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NbDialogService} from "@nebular/theme";
import {MSedeAreasComponent} from "../components/modals/m-sede-areas/m-sede-areas.component";
import Swal from "sweetalert2";
import {AppService} from "../../../../core";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-type-elements-home',
  templateUrl: './sede-areas-home.component.html',
  styleUrls: ['./sede-areas-home.component.scss']
})
export class SedeAreasHomeComponent implements OnInit {

  loading:boolean = false;
  sedeAreasData: any [] = [];

  formHeader: any = FormGroup;
  selectedItem = 20;
  pagination: any = {
    page: 1,
    per_page: 20,
    sizePage: 0,
    sizeListData: 0,
    isDisabledPage: false,
  };
  pagesCount: any[] = [20, 30, 50, 100, 200, 300, 500, 1000];
  constructor(private generalService: GeneralService,
              private dialogService: NbDialogService,
              private appUserInfo: AppService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fieldReactive();
    this.getData();
  }
  private fieldReactive() {
    const controls = {
      nombre_sede: [''],
      nombre_area: [''],
    };
    this.formHeader = this.formBuilder.group(controls);
  }
  getData(){
    this.loading = true
    const serviceName = 'sedeAreas';
    const forms =  this.formHeader.value;
    const param={
      per_page: this.pagination.per_page,
      page: this.pagination.page,
      nombre_sede: forms.nombre_sede || '',
      nombre_area: forms.nombre_area || '',
    }
    this.generalService.nameParams$(serviceName,param).subscribe((res:any) => {
      this.sedeAreasData = res.data;
      this.pagination.sizeListData = res.meta && res.meta.total || 0;
      this.pagination.sizePage = res.meta && res.meta.per_page || 0;
      if (this.pagination.sizeListData < this.sedeAreasData.length) {
        this.pagination.isDisabledPage = true;
      } else {
        this.pagination.isDisabledPage = false;
      }
      if(res.success){
        this.loading = true;
      }
    }, () => {this.loading = false}, () => {this.loading = false});
  }
  refresh() {
    this.pagination.page = 1;
    this.getData();
  }
  loadPage($event: any): any {
    this.pagination.page = $event;
    this.getData();
  }
  sizeTable($event: any): any {
    this.pagination.per_page = $event;
    this.getData();
  }
  keyNombreSede($event:any) {
    if (!this.formHeader.value.nombre_sede) {
      this.pagination.page = 1;
      this.getData();
    }
  }
  keyNombreArea($event:any) {
    if (!this.formHeader.value.nombre_area) {
      this.pagination.page = 1;
      this.getData();
    }
  }
  open(item: any, code: any){
    this.dialogService.open(MSedeAreasComponent, {
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
    const serviceName = 'sedeAreas'
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
