import {Component, Input, OnInit} from '@angular/core';
import {GeneralService} from "../../../../../../providers";
import {NbDialogRef, NbToastrService} from "@nebular/theme";
import {FormControl} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-m-teacher-add-course',
  templateUrl: './m-teacher-add-course.component.html',
  styleUrls: ['./m-teacher-add-course.component.scss']
})
export class MTeacherAddCourseComponent implements OnInit {

  closeAndGetInfo: boolean = false;

  listCourse: any = [];
  @Input() teachers_I: any;
  @Input() formHeader: any;
  selectedItem = 20;
  pagination: any = {
    page: 1,
    per_page: 20,
    sizePage: 0,
    sizeListData: 0,
    isDisabledPage: false,
  };
  termino: any;
  pagesCount: any[] = [20, 50, 100];
  loading: boolean = false;

  constructor(private generalService: GeneralService,
              public activeModal: NbDialogRef<MTeacherAddCourseComponent>,
              ) { }

  ngOnInit(): void {
    this.getCourseZoom();
  }
  closeModal() {
    this.activeModal.close('');
  }


  getCourseZoom() {
    this.loading = true;
    const serviceName = 'courses';
    const forms =  this.formHeader;
    const params = {
      programa_estudio_id: forms.programa_estudio?.id || 0,
      semester_id: forms.semestre || '',
      ciclo: forms.ciclo || '',
      grupo: forms.grupo || '',
      nombre: this.termino || '',
      type_teacher_code: forms.type_teacher_code || '',
      per_page: this.pagination.per_page,
      page: this.pagination.page,
      paginate: 'S',
    }
    this.generalService.nameParams$(serviceName, params).subscribe((res:any) => {
      this.listCourse = res.data || [];
      this.pagination.sizeListData = res.meta && res.meta.total || 0;
      this.pagination.sizePage = res.meta && res.meta.per_page || 0;
      this.pagination.isDisabledPage = this.pagination.sizeListData < this.listCourse.length;
    },() => {this.loading = false}, () =>  {this.loading = false});
  }
  loadPage($event: any): any {
    this.pagination.page = $event;
    this.getCourseZoom();
  }
  sizeTable($event: any): any {
    this.pagination.per_page = $event;
    this.getCourseZoom();
  }
  eventGetCourse(event: any) {
      if(event) {
        this.getCourseZoom();
      }
  }
  eventTermino(event: any) {
      this.termino = event;
      this.getCourseZoom();
  }
}