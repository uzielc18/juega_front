import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../providers";
import {MCoursesTypesComponent} from "../../courses-types/components/modals/m-courses-types/m-courses-types.component";
import {NbDialogService} from "@nebular/theme";
import Swal from "sweetalert2";
import {MTypeAlternativesComponent} from "../components/modals/m-type-alternatives/m-type-alternatives.component";
import {END_POINTS} from "../../../../providers/utils";
import {AppService} from "../../../../core";

@Component({
  selector: 'app-type-alternatives-home',
  templateUrl: './type-alternatives-home.component.html',
  styleUrls: ['./type-alternatives-home.component.scss']
})
export class TypeAlternativesHomeComponent implements OnInit {

  typeAlernativesData: any[] =[]
  loading:boolean = false;
  constructor(private generalService: GeneralService,
              private dialogService: NbDialogService,
              ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.loading = true
    const serviceName = END_POINTS.base_back.quiz + '/typeAlternatives'
    this.generalService.nameAll$(serviceName).subscribe(resp => {
      this.typeAlernativesData = resp.data
    }, () => {this.loading = false}, () => this.loading = false)
  }
  opentypeAlternatives(item: any, code: any){
    this.dialogService.open(MTypeAlternativesComponent,{
      dialogClass: 'dialog-limited-height',
      context: {
        item: item,
        code: code
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe(resp => {
      if (resp === 'ok'){
        this.getData();
      }
    })
  }
  deleteTypeAlternatives(item:any){
    const serviceName = END_POINTS.base_back.quiz + '/typeAlternatives'
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
