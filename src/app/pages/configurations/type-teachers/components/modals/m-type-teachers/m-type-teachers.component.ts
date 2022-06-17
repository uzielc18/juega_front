import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";

@Component({
  selector: 'app-m-type-teachers',
  templateUrl: './m-type-teachers.component.html',
  styleUrls: ['./m-type-teachers.component.scss']
})
export class MTypeTeachersComponent implements OnInit {

  loading:boolean = false;
  FormTypeTeacher: any = FormGroup;
  @Input() code: any;
  @Input() item: any;
  @Input() userInfo: any;
  constructor(public activeModal: NbDialogRef<MTypeTeachersComponent>,
              private fb:FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fieldsReactive();
  }
  private fieldsReactive(){
    const controls = {
      codigo: ['', [Validators.required,Validators.maxLength(4)]],
      nombre: ['', [Validators.required]],
      accion: ['', Validators.required],
    }
    this.FormTypeTeacher = this.fb.group(controls);
    if(this.code === 'UPDATE'){
      this.setUpdate();
    }
  }
  setUpdate(){
    this.FormTypeTeacher.patchValue({
      codigo: this.item.codigo,
      nombre: this.item.nombre,
      accion: this.item.accion
    });
  }
  closeModal(){
    this.activeModal.close('close')
  }
  saveTypeTeacher(){
    const serviceName = 'typeTeachers';
    const forms = this.FormTypeTeacher.value;
    const params = {
      codigo: forms.codigo.toUpperCase(),
      nombre: forms.nombre,
      accion: forms.accion,
      userid: this.userInfo.id

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
