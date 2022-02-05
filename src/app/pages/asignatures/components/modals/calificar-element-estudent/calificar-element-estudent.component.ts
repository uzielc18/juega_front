import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { AppService } from 'src/app/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { CForumsComponent } from '../../c-free/calificar-elements/c-forums/c-forums.component';

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
  userInfo: any;
  listResponses:any = [];

  constructor(public activeModal: NbDialogRef<CalificarElementEstudentComponent>, private formBuilder: FormBuilder, private generalServi: GeneralService,
    private userService: AppService) {
    this.searchableList = ['nombres', 'apellido_paterno', 'apellido_materno'];
  }

  ngOnInit(): void {
    // console.log(this.element);

    this.fieldReactive();
    this.filedMoreDate();
    this.getListEstudent();
  }
  private fieldReactive() {
    const controls = {
      ver_trabajo: ['N'],
      comentario: ['', [Validators.required]],
      nota: ['', [Validators.required, Validators.maxLength(2), Validators.max(20)]],
    };
    this.formHeader = this.formBuilder.group(controls);
  }
  private filedMoreDate() {
    const controls = {
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      person_student_id: [''],
      codigo: ['']
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
          this.headStudent = res && res.data || '';
          // this.totalAlumnos = res.data && res.data[0].total_students || [];
          // this.listAlumns = res && res.data && res.data[0].total_students || [];
        }, () => { this.loading = false; }, () => { this.loading = false; });
    }
  }
  selectedStudent(item:any) {
    this.formDate.controls['person_student_id'].setValue('');
    this.formHeader.controls['nota'].setValue('');
    this.pending = '';
    this.listResponses = [];
    this.listAlumns.map((res:any) => {
      res.checked = false;
      res.background = '';
      res.color = '';
    });
      item.checked = true;
      item.background = 'brown';
      item.color = 'white';
      this.getPendings(item.persons_student_id);
      this.formDate.controls['person_student_id'].setValue(item.person_student_id);
      this.formHeader.controls['nota'].setValue(item.nota || '');
      this.datosStudent = item;
      if (this.element?.type_element?.codigo === 'FOR') { // SI ES FORO
        setTimeout(() => {
          this.getResponsesDocen(item.persons_student_id); //envir al hijo
        }, 1000);
      }
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
    this.formDate.controls['person_student_id'].setValue('');
    this.formHeader.controls['nota'].setValue('');
    const idTab = $event.tabId;
    this.formDate.controls['codigo'].setValue(idTab);
    this.pending = '';
    this.datosStudent = '';
    this.listResponses = [];
    switch (idTab) {
      case 'ALL': // Todos
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
        this.listAlumns = res && res.data || [];
        // if (this.listAlumns.length>0) {
        //   this.listAlumns.map((re:any) => {
        //     if (re.persons_student_id === 909) {
        //       re.realizo = '1';
        //      }
        //   })
        // }
      }, () => { this.loading = false; }, () => { this.loading = false; });
    }
  }
  calificarWork() {
    const serviceName = END_POINTS.base_back.resourse + '/marking-student-work';
    const forms= this.formHeader.value;
    const params: any = {
      comentario_docente : forms.comentario,
      nota: forms.nota,
    }
    this.loading = true;
    this.generalServi.addNameIdData$(serviceName, this.pending.student_pending.id, params).subscribe((res:any) => {
      if (res.success) {
        this.fieldReactive();
        this.getListEstudent();
        this.getStudentStatus(this.formDate.value.codigo);
        this.pending = '';
        this.datosStudent = '';
        this.listResponses = [];
      }
    }, () => { this.loading = false; }, () => { this.loading = false; });
  }
  getUserInfo() {
    this.userInfo = this.userService.user;
  }
  getResponsesDocen(persons_student_id:any) {
    const serviceName = END_POINTS.base_back.resourse + '/list_responses_forum';
    const params = {
      person_id: persons_student_id,
    }
    if (params && params.person_id) {
      this.loading = true;
        this.generalServi.nameIdParams$(serviceName, this.element.forums.id, params).subscribe((res:any) => {
          this.listResponses = res.data || [];
          if (this.listResponses.length>0) {
            this.listResponses.map((re:any) => {
              re.checked = false;
            })
          }
        }, () => { this.loading = false; }, () => { this.loading = false; });
    }
  }
}
