import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../providers";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NbDialogService} from "@nebular/theme";
import {MAreasComponent} from "../components/modals/m-areas/m-areas.component";
import Swal from "sweetalert2";
import {AppService} from "../../../../core";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-type-elements-home',
  templateUrl: './areas-home.component.html',
  styleUrls: ['./areas-home.component.scss']
})
export class AreasHomeComponent implements OnInit {

  loading:boolean = false;
  areasData: any [] = [];
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
      nombre: [''],
    };
    this.formHeader = this.formBuilder.group(controls);
  }
  getData(){
    this.loading = true
    const serviceName = 'areas';
    const forms =  this.formHeader.value;
    const param={
      per_page: this.pagination.per_page,
      page: this.pagination.page,
      nombre: forms.nombre || '',
    }
    this.generalService.nameParams$(serviceName,param).subscribe((res:any) => {
        this.areasData = res.data;
      this.pagination.sizeListData = res.meta && res.meta.total || 0;
      this.pagination.sizePage = res.meta && res.meta.per_page || 0;
      if (this.pagination.sizeListData < this.areasData.length) {
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
  keyNombre($event:any) {
    if (!this.formHeader.value.nombre) {
      this.pagination.page = 1;
      this.getData();
    }
  }
  open(item: any, code: any){
    this.dialogService.open(MAreasComponent, {
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
    const serviceName = 'areas'
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