import { Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbTagComponent, NbTagInputAddEvent} from "@nebular/theme";
import {GeneralService} from "../../../../../../providers";
import Swal from "sweetalert2";

@Component({
  selector: 'app-m-add-sala',
  templateUrl: './m-add-sala.component.html',
  styleUrls: ['./m-add-sala.component.scss']
})
export class MAddSalaComponent implements OnInit {

  data: any = [];
  loading: boolean = false;
  @Input() item: any;
  trees: Set<any> = new Set([]);
  constructor(public activeModal: NbDialogRef<MAddSalaComponent>,
              private generalService: GeneralService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.activeModal.close('close');
  }
  onTagRemove(tagToRemove: NbTagComponent): void {
    this.trees.delete(tagToRemove.text);
  }

  onTagAdd({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.trees.add(value)
    }
    input.nativeElement.value = '';
  }

  procesar(){
    this.loading= true;
    const serviceName = 'validate-codigos';
    let array:any = [];
    this.trees.forEach((r:any) => {
      array.push(r);
    });
    const params = {
      codigos: array.join(',') || '',
    }
    this.generalService.nameParams$(serviceName, params).subscribe(res => {
        this.data = res.data;
    }, () => {this.loading = false}, () => {this.loading = false})
  }

  addSalas(){
    const serviceName = 'create-zoom-room';
    let array:any = [];
    this.data.forEach((r:any) => {
      if (Number(r.estado) === 1) {
        array.push(r.codigo);
      }
    });
    const data = {
      codigos: array.join(',') || '',
    }
    if (data && data.codigos) {
      Swal.fire({
        title: 'CREAR SALA',
        text: '¿ Desea crear las salas ? ',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#00244E',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        // timer: 2000,
      }).then((result:any) => {
        if (result.isConfirmed) {
          this.loading = true;
          this.generalService.addNameData$(serviceName, data).subscribe(res => {
            if(res.success){
              this.activeModal.close('ok');
            }
          },() => {this.loading = false}, () => {this.loading = false})
        }
      });
    }

  }
}
