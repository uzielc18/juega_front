import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";

@Component({
  selector: 'app-m-courses-types',
  templateUrl: './m-courses-types.component.html',
  styleUrls: ['./m-courses-types.component.scss']
})
export class MCoursesTypesComponent implements OnInit {

  loading:boolean = false
  @Input() item: any;
  @Input() code: any;
  FormCourseTypes:any = FormGroup
  constructor(public activeModal: NbDialogRef<MCoursesTypesComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fieldsReactive();
  }

  private fieldsReactive(){
    const controls = {
      nombre: ['', [Validators.required]],
      codigo: ['', [Validators.required]]
    };
    this.FormCourseTypes = this.fb.group(controls)

    if(this.code === 'UPDATE'){
      this.setData();
    }
  }
  setData(){
    this.FormCourseTypes.patchValue({
      nombre: this.item.nombre,
      codigo: this.item.codigo
    });
  }
  closeModal(){
    this.activeModal.close('close')
  }
  saveCourseTypes(){
    const serviceName = 'coursesTypes';
    const forms = this.FormCourseTypes.value;
    const params = {
      codigo: forms.codigo,
      nombre: forms.nombre,
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
