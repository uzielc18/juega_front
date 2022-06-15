import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";
import {END_POINTS} from "../../../../../../providers/utils";

@Component({
  selector: 'app-m-semesters',
  templateUrl: './m-semesters.component.html',
  styleUrls: ['./m-semesters.component.scss']
})
export class MSemestersComponent implements OnInit {
  @Input() code: any;

  @Input() item: any;

  FormSemestre:any = FormGroup

  loading: boolean = false

  constructor(public activeModal: NbDialogRef<MSemestersComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fieldsReactive();
  }

  closeModal(){
    this.activeModal.close('close');
  }


  private fieldsReactive(){
    const controls = {
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', Validators.required],
      vigente: [false, Validators.required]
    }
    this.FormSemestre = this.fb.group(controls);
    if(this.code === 'UPDATE'){
      this.setUpdate();
    }
  }
  setUpdate(){
    this.FormSemestre.patchValue({
      codigo: this.item.codigo,
      nombre: this.item.nombre,
      descripcion: this.item.descripcion,
      vigente: this.item.vigente === '1' ? true : false,
    });
  }

  saveSemester() {
    const serviceName = 'semesters';
    const forms = this.FormSemestre.value;
    const params = {
      codigo: forms.codigo,
      nombre: forms.nombre,
      descripcion: forms.descripcion,
      vigente: forms.vigente === true ? 1 : 0,
    };
    if (this.code === 'NEW') {
      this.loading = true;
      this.generalService.addNameData$(serviceName, params).subscribe((res:any) => {
        if (res.success) {
          this.activeModal.close('ok');
        }
      }, () => {this.loading = false;}, () => {this.loading = false;});

    } else {
      this.loading = true;
      this.generalService.updateNameIdData$(serviceName, this.item.id, params).subscribe((res:any) => {
        if (res.success) {
          this.activeModal.close('ok');
        }
      }, () => {this.loading = false;}, () => {this.loading = false;});
    }
  }

}
