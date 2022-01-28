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
  listAlumns:any = [
    {
      nombre: 'Marlo Huarcaya Quilla',
      checked: false,
      id: 749,
    },
    {
      nombre: 'Anfres Carlos Slamatea',
      checked: false,
      id: 1,
    },
    {
      nombre: 'Godofredo Empatico en tutados',
      checked: false,
      id: 2,
    }
  ];
  formHeader: any = FormGroup;
  pending:any;
  formDate: any = FormGroup;
  constructor(public activeModal: NbDialogRef<CalificarElementEstudentComponent>, private formBuilder: FormBuilder, private generalServi: GeneralService) { }

  ngOnInit(): void {
    this.fieldReactive();
    this.filedMoreDate();
  }
  private fieldReactive() {
    const controls = {
      ver_trabajo: ['N'],
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
    const serviceName = '';
    if (this.element?.id) {
      this.loading = true;
        this.generalServi.nameId$(serviceName, this.element.id).subscribe((res:any) => {
          this.listAlumns = res.data || [];
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
      this.getPendings(item.id);
      this.formDate.controls['person_id'].setValue(item.id);
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
}
