import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {GeneralService} from "../../../../../../providers";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {END_POINTS} from "../../../../../../providers/utils";
import Swal from "sweetalert2";

@Component({
  selector: 'app-m-tutores',
  templateUrl: './m-tutores.component.html',
  styleUrls: ['./m-tutores.component.scss']
})
export class MTutoresComponent implements OnInit {
  showTeachersToImport: boolean = false;
  resetTeacherImportButton: boolean = false;
  loading: boolean = false;
  data: any = [];
  listOfTeachers: any = [];
  formHeader: any = FormGroup;
  @Input() items: any;
  constructor(
              private generalService: GeneralService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fieldReactive();
    this.getData();
  }
  private fieldReactive() {
    const controls = {
      teacherToImportName: ['', [Validators.required]],
      idteacherToImportName: ['', [Validators.required]],
      checkbox: [false, [Validators.required]]
    };
    this.formHeader = this.fb.group(controls);

    this.getListOfTeachers()
  }

  getListOfTeachers() {
      const serviceName = END_POINTS.base_back.default + 'get-teachers';
      this.loading = true;
      this.generalService.nameAll$(serviceName).subscribe(
        (res: any) => {
          if (res.success) {
            this.listOfTeachers = res.data;
          }
        });

  }
  // to import teachers
  searchTeachersToImport() {
    this.showTeachersToImport = true;
    this.resetTeacherImportButton = true;
  }
  setTeacherToImport(teacher: any) {
    this.showTeachersToImport = false;
    this.formHeader.controls['teacherToImportName'].setValue(teacher.nombres_completos);
    this.formHeader.controls['idteacherToImportName'].setValue(teacher.id)
  }
  resetTeachersToImport(){
      this.resetTeacherImportButton = false;
      this.showTeachersToImport = false;

  }

  getData(){
    const serviceName = 'tutors';
    const params = {
      course_id: this.items.id
    }
    this.generalService.nameParams$(serviceName, params).subscribe(res => {
      this.data = res.data
    }, () => {this.loading = false}, () => {this.loading = false})
  }
  newTutores(){
    const serviceName = 'tutors';
    const  data = {
      course_id : this.items.id,
      persons_teacher_id : this.formHeader.get('idteacherToImportName').value,
      semester_id: this.items.semester_id,
      visible: this.formHeader.get('checkbox').value === true ? 1: 0,
    }
    this.loading = true;
    this.generalService.addNameData$(serviceName, data).subscribe(res => {
      if(res.success){
        this.getData();
      }
    })


  }
  deleteTutor(item: any){

    const serviceName = 'tutors';
    Swal.fire({
      title: 'Eliminar',
      text: '¿ Desea eliminar ? ',
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
        this.loading = true
        this.generalService.deleteNameId$(serviceName, item.id).subscribe((res:any) => {
          if (res.success) {
            this.getData();
          }
        });
      }
    });
  }

}
