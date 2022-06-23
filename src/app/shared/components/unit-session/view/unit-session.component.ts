import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {NbDialogService} from "@nebular/theme";
import {MUnitComponent} from "./components/modals/m-unit/m-unit.component";
import {GeneralService} from "../../../../providers";
import {AppService} from "../../../../core";
import {MSessionComponent} from "./components/modals/m-session/m-session.component";
import Swal from "sweetalert2";
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-unit-session',
  templateUrl: './unit-session.component.html',
  styleUrls: ['./unit-session.component.scss']
})
export class UnitSessionComponent implements OnInit {
  loading: boolean = false;
  unitSession: any [] = [];
  @Input() id_carga_curso_docente:any;
  constructor(private dialogService: NbDialogService,
              private generalService: GeneralService,
              private appUserInfo: AppService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.loading = true;
    const serviceName = 'list-units';
    this.generalService.nameId$(serviceName, this.id_carga_curso_docente.id_carga_curso_docente).subscribe(resp => {
      this.unitSession = resp.data
    }, () => {this.loading = false}, ()=>{this.loading = false});

  }
  openUnit(item: any, unit:any, code: any){
    this.dialogService.open(MUnitComponent, {
      context: {
        userInfo: this.appUserInfo.user,
        unit: unit,
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
  openSession(topics: any, unit:any,  code:any){
    this.dialogService.open(MSessionComponent, {
      context: {
        unit: unit,
        userInfo: this.appUserInfo.user,
        topics: topics,
        code: code,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe(resp => {
      if(resp === 'ok'){
        this.getData();
      }
    })
  }
  deleteTopics(item: any){
    const serviceName = 'topics'
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
  deleteUnit(item:any){
    const serviceName = 'units'
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
  array(){
    const array =  JSON.parse(JSON.stringify(this.unitSession));
    const newArray:any = [];
    if(array.length > 0){

      array.forEach((res: any, index:any) => {
        const unit: any = {
          unit_id: res.id,
          orden_unidad: index + 1,
          topics: []
        }
        if(res.topics.length > 0){
          res.topics.forEach((r: any, i:any) =>{
            const topic: any = {
              id: r.id,
              orden_tema: i + 1,
            }
            unit.topics.push(topic);
          });
        }
        newArray.push(unit);
      })
    }
    return newArray
  }
  saveOrder(){
    this.loading = true
    const serviceName = 'save-units-order';
    const params = {
      units: this.array(),
    }
    this.generalService.updateNameIdData$(serviceName, this.id_carga_curso_docente.id_carga_curso_docente, params).subscribe(resp  => {
    }, () => {this.loading = false}, () => this.loading = false)

  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
