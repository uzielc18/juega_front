import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {GeneralService} from "../../../../../../providers";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {END_POINTS} from "../../../../../../providers/utils";
import Swal from "sweetalert2";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-m-tutores',
  templateUrl: './m-tutores.component.html',
  styleUrls: ['./m-tutores.component.scss']
})
export class MTutoresComponent implements OnInit {
  showTeachersToImport: boolean = false;
  resetTeacherImportButton: boolean = false;
  searchstring: any = [];
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
      idteacherToImportName: ['', [Validators.required]],
      checkbox: [false, [Validators.required]],
      termino: ['']
    };
    this.formHeader = this.fb.group(controls);

    this.getListOfTeachers()
  }
  getListOfTeachers() {
    const serviceName = END_POINTS.base_back.default + 'person-teach';
    if (this.formHeader.get('termino').value !== '') {
      this.formHeader.controls['termino'].valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged((curr: any, prev: any) => {
            return curr.toLowerCase() === prev.toLowerCase();
          }),
          switchMap(text => {
            this.searchstring.push(text);
            if (text !== '' && this.searchstring[this.searchstring.length - 1] !== this.searchstring[this.searchstring.length - 2]) {
              return this.generalService.nameParams$(serviceName, { q: text });
            } else {
              this.searchstring = [];
              this.listOfTeachers = [];
              return [];
            }
          })
        )
        .subscribe((res: any) => {
          if (res.data) {
            this.listOfTeachers = res.data.splice(0, 5);
          }
          // console.log(this.listEstudiantes);
        });
    }
  }

  setTermino(termino: any) {
    if (termino !== '') {
      this.formHeader.controls['termino'].setValue(`${termino.nombres} ${termino.apellido_paterno} ${termino.apellido_materno}`);
      this.formHeader.controls['idteacherToImportName'].setValue(termino.id);
      this.listOfTeachers = [];
      // console.log(this.formHeader.controls['termino'].value);
    }
  }
  // to import teachers
  searchTeachersToImport() {
    this.showTeachersToImport = true;
    this.resetTeacherImportButton = true;
  }
  setTeacherToImport(teacher: any) {
    this.showTeachersToImport = false;
    this.formHeader.controls['teacherToImportName'].setValue(teacher.nombreCompletos);
    this.formHeader.controls['idteacherToImportName'].setValue(teacher.id)
  }
  resetTeachersToImport(){
      this.resetTeacherImportButton = false;
      this.showTeachersToImport = false;
      this.formHeader.controls['teacherToImportName'].setValue('')
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
        this.formHeader.controls['termino'].setValue('');
        this.formHeader.controls['checkbox'].setValue(false)
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
