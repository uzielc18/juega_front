import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../providers";
import {END_POINTS} from "../../../../providers/utils";
import {NbDialogService} from "@nebular/theme";
import {MCoursesTypesComponent} from "../components/modals/m-courses-types/m-courses-types.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-courses-type-home',
  templateUrl: './courses-type-home.component.html',
  styleUrls: ['./courses-type-home.component.scss']
})
export class CoursesTypeHomeComponent implements OnInit {

  coursesData: any []= []
  loading: boolean = false;
  constructor(private generService: GeneralService,
              private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(){
    this.loading = true
    const serviceName = '/coursesTypes';
    this.generService.nameAll$(serviceName).subscribe(res => {
      this.coursesData = res.data;
    },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      })
  }
  openCoursesTypes(item: any, code: any){
    this.dialogService.open(MCoursesTypesComponent,{
      dialogClass: 'dialog-limited-height',
      context: {
          item: item,
          code: code
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe(resp => {
      if (resp === 'ok'){
        this.getCourses();
      }
    })
  }
  deleteCourseTypes(item:any){
    const serviceName = 'coursesTypes'
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
            this.getCourses();
          }
        },() => {this.loading = false;},() => {this.loading = false;});
      }
    });
  }


}
