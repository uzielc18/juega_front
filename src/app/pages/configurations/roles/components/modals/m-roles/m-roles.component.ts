import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";
import {END_POINTS} from "../../../../../../providers/utils";

@Component({
  selector: 'app-m-roles',
  templateUrl: './m-roles.component.html',
  styleUrls: ['./m-roles.component.scss']
})
export class MRolesComponent implements OnInit {
  @Input() code: any;

  @Input() item: any;

  FormRoles:any = FormGroup

  loading: boolean = false

  constructor(public activeModal: NbDialogRef<MRolesComponent>,
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
      name: ['', [Validators.required]],
      guard_name: ['', [Validators.required]]
    }
    this.FormRoles = this.fb.group(controls);
    if(this.code === 'UPDATE'){
      this.setUpdate();
    }
  }
  setUpdate(){
    this.FormRoles.patchValue({
      name: this.item.name,
      guard_name: this.item.guard_name,
    });
  }

  save() {
    const serviceName = 'roles';
    const forms = this.FormRoles.value;
    const params = {
      name: forms.name,
      guard_name: forms.guard_name,
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
