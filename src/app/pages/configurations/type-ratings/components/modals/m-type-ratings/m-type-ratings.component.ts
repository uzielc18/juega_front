import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";

@Component({
  selector: 'app-m-type-ratings',
  templateUrl: './m-type-ratings.component.html',
  styleUrls: ['./m-type-ratings.component.scss']
})
export class MTypeRatingsComponent implements OnInit {

  loading:any = false;
  defaultIcon: any = 'info-outline'
  FormTypeRantings: any = FormGroup;
  @Input() code: any;
  @Input() item: any;
  @Input() userInfo: any;
  constructor(public activeModal: NbDialogRef<MTypeRatingsComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fieldsReactive();
  }

  private fieldsReactive(){
    const controls = {
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      max_valor: ['', Validators.required],
      min_valor: ['', Validators.required],
      icono: ['', Validators.required],
    }
    this.FormTypeRantings = this.fb.group(controls);
    if(this.code === 'UPDATE'){
      this.setUpdate();
    }
  }
  setUpdate(){
    this.FormTypeRantings.patchValue({
      codigo: this.item.codigo,
      nombre: this.item.nombre,
      max_valor: this.item.max_valor,
      min_valor: this.item.min_valor,
      icono: this.item.icono,
    })
  }
  closeModal(){
    this.activeModal.close('close')
  }
  saveTypeRatings(){
    const serviceName = 'typeRatings';
    const forms = this.FormTypeRantings.value;
    const params = {
      codigo: forms.codigo,
      nombre: forms.nombre,
      max_valor: forms.max_valor,
      min_valor: forms.min_valor,
      icono: forms.icono,
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
