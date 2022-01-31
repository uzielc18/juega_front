import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-calificar-element-estudent',
  templateUrl: './calificar-element-estudent.component.html',
  styleUrls: ['./calificar-element-estudent.component.scss']
})
export class CalificarElementEstudentComponent implements OnInit {
  loading:boolean = false;
  @Input() element:any;
  listAlumns:any = [];
  formHeader: any = FormGroup;
  pending:any;
  formDate: any = FormGroup;
  headStudent:any;
  totalAlumnos:any = [];
  datosStudent:any;
  public searchableList: any[] = [];
  public queryString:any;
  constructor(public activeModal: NbDialogRef<CalificarElementEstudentComponent>, private formBuilder: FormBuilder, private generalServi: GeneralService) {
    this.searchableList = ['nombres', 'apellido_paterno', 'apellido_materno'];
  }

  ngOnInit(): void {
    console.log(this.element);

    this.fieldReactive();
    this.filedMoreDate();
    this.getListEstudent();
  }
  private fieldReactive() {
    const controls = {
      ver_trabajo: ['N'],
      comentario: [''],
      nota: ['', [Validators.required, Validators.maxLength(2), Validators.max(20)]],
    };
    this.formHeader = this.formBuilder.group(controls);
  }
  private filedMoreDate() {
    const controls = {
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      person_id: ['']
    };
    this.formDate = this.formBuilder.group(controls);
  }
  closeModal() {
    this.activeModal.close('close');
  }
  getListEstudent() {
    const serviceName = END_POINTS.base_back.resourse + '/get-work-list-students';
    if (this.element?.id) {
      this.loading = true;
        this.generalServi.nameId$(serviceName, this.element.id).subscribe((res:any) => {
          this.headStudent = res && res.data[0] || '';
          this.totalAlumnos = res.data && res.data[0].total_students || [];
          this.listAlumns = res && res.data && res.data[0].total_students || [];
        }, () => { this.loading = false; }, () => { this.loading = false; });
    }
  }
  selectedStudent(item:any) {
    this.listAlumns.map((res:any) => {
      res.checked = false;
      res.background = '';
      res.color = '';
    });
      item.checked = true;
      item.background = 'brown';
      item.color = 'white';
      this.getPendings(item.persons_student_id);
      this.formDate.controls['person_id'].setValue(item.id);
      this.datosStudent = item;
  }
  getPendings(id_person_student:any) {
    const serviceName = END_POINTS.base_back.resourse + '/get-pending-student';
    // this.userInfo.id
    this.loading = true;
    this.generalServi.nameIdAndId$(serviceName, this.element.id, id_person_student).subscribe((res:any) => {
      this.pending = res.data || '';
    }, () => { this.loading = false; }, () => { this.loading = false; });
  }
  updateDateStudent() {

  }
  changeTabSet($event:any) {
    const idTab = $event.tabId;
    this.pending = '';
    this.datosStudent = '';
    switch (idTab) {
      case 'ALL': // Todos
      this.listAlumns = this.totalAlumnos;
      break;
      case 'SC': // Sin calificar
      case 'C': //Calificados
      case 'SE': //Sin enviar
      this.getStudentStatus(idTab);
        break;
      default:

        break;
    }
  }
  getStudentStatus(codigo:any) {
    const serviceName = END_POINTS.base_back.resourse + '/get-list-students-by-code';
    const params = {
      codigo: codigo
    };
    if (codigo) {
      this.loading = true;
      this.generalServi.nameIdParams$(serviceName, this.element.id, params).subscribe((res:any) => {
        this.listAlumns = res && res.data[0] && res.data[0].total_sin_calificar || [];
      }, () => { this.loading = false; }, () => { this.loading = false; });
    }
  }
  calificarWork() {
    const serviceName = END_POINTS.base_back.resourse + '/marking-student-work';
    const forms= this.formHeader.value;
    const params: any = {
      comentario: forms.comentario,
      nota: forms.nota,
    }
    this.loading = true;
    this.generalServi.addNameIdData$(serviceName, this.pending.student_pending.id, params).subscribe((res:any) => {
      if (res.success) {
        this.fieldReactive();
        this.getListEstudent();
        this.pending = '';
      }
    }, () => { this.loading = false; }, () => { this.loading = false; });
  }
}
