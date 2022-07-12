import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-m-section',
  templateUrl: './m-section.component.html',
  styleUrls: ['./m-section.component.scss']
})
export class MSectionComponent implements OnInit {
@Input() quiz:any;
@Input() codes:any;
@Input() index:any;
loading:boolean = false;
formHeader: any = FormGroup;
constructor(public activeModal: NbDialogRef<MSectionComponent>, private formBuilder: FormBuilder,
  private generalServi: GeneralService) { }

ngOnInit(): void {
  this.fieldReactive();
}
private fieldReactive() {
  const controls = {
    titulo: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    orden: [(this.codes === 'NEW' ? this.index : this.quiz.orden) || ''],
  };
  this.formHeader = this.formBuilder.group(controls);
  if (this.codes === 'UPDATE') {
    this.setUpdate();
  }
}
closeModal() {
  this.activeModal.close('close');
}
saveSection() {
  const serviceName = END_POINTS.base_back.quiz + '/sections';
  const forms = this.formHeader.value;
  const params:any = {
    titulo: forms.titulo,
    descripcion: forms.descripcion,
    orden: forms.orden,
    exam_id: this.quiz.exam_id
  };
  if (params && params.titulo && params.descripcion && this.quiz.exam_id) {
    if (this.codes === 'NEW') {
      this.loading =true;
          this.generalServi.addNameData$(serviceName, params).subscribe(r => {
            if (r.success) {
              this.activeModal.close('ok');
            }
          }, () => { this.loading = false; }, () => { this.loading = false; });
    } else {
      this.loading =true;
          this.generalServi.updateNameIdData$(serviceName, this.quiz.id, params).subscribe(r => {
            if (r.success) {
              this.activeModal.close('ok');
            }
          }, () => { this.loading = false; }, () => { this.loading = false; });
    }
  }

}
setUpdate() {
  this.formHeader.patchValue({
    titulo: this.quiz.titulo || '',
    descripcion: this.quiz.descripcion || '',
  });
}
}
