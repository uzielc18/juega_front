import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../providers";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NbDialogService} from "@nebular/theme";
import {MDisciplinasComponent} from "../components/modals/m-disciplinas/m-disciplinas.component";
import Swal from "sweetalert2";
import {AppService} from "../../../../core";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-disciplinas-home',
  templateUrl: './disciplinas-home.component.html',
  styleUrls: ['./disciplinas-home.component.scss']
})
export class DisciplinasHomeComponent implements OnInit {

  loading:boolean = false;
  disciplinasData: any [] = [];
  campeonatos: any [] = [];
  campeonato_id: any;
  formHeader: any = FormGroup;
  constructor(private generalService: GeneralService,
              private dialogService: NbDialogService,
              private appUserInfo: AppService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getData();
    this.getCampeonatos();
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      campeonato: [''],
      campeonato_id: [''],
    };
    this.formHeader = this.formBuilder.group(controls);
  }

  getData(){
    this.loading = true;
    const forms =  this.formHeader.value;
    const param={
      campeonato_id: this.campeonato_id || '',
    }
    const serviceName = 'upeudisciplinas';
    this.generalService.nameParams$(serviceName, param).subscribe(resp => {
      this.disciplinasData = resp.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }

  getCampeonatos(){
    this.loading = true
    const serviceName = 'upeucampeonatos';
    this.generalService.nameAll$(serviceName).subscribe(resp => {
      this.campeonatos = resp.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }

  selectedCampeonato(sede: any) {
    this.campeonato_id=sede.id;
    this.getData();
  }

  refresh() {
    this.getData();
  }

  open(item: any, code: any){
    this.dialogService.open(MDisciplinasComponent, {
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
    const serviceName = 'upeudisciplinas'
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
