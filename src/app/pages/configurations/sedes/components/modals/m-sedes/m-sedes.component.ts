import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";

@Component({
  selector: 'app-m-type-elements',
  templateUrl: './m-sedes.component.html',
  styleUrls: ['./m-sedes.component.scss']
})
export class MSedesComponent implements OnInit {

  loading:boolean = false
  FormSedes: any = FormGroup
  defaultIcon:any = 'info-outline';
  //color_active2 = new FormControl('')
  @Input() item: any;
  @Input() code: any;
  @Input() userInfo: any;
  constructor(public activeModal: NbDialogRef<MSedesComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fielsReactive();
  }

  private fielsReactive() {
    const controls = {
      id_sede: [''],
      nombre: ['',[Validators.required]],
      codigo: [''],
      url_pago_visa: [''],
      codigo_pago: [''],
      estado: ['1'],
    };
    this.FormSedes = this.fb.group(controls)
    if(this.code === 'UPDATE'){
      this.setData();
    }
  }

  setData(){
    this.FormSedes.patchValue({
      id_sede: this.item.id_sede,
      nombre: this.item.nombre,
      codigo: this.item.codigo,
      url_pago_visa: this.item.url_pago_visa,
      codigo_pago: this.item.codigo_pago,
      estado: this.item.estado,
    })
  }
  closeModal(){
    this.activeModal.close('close');
  }
  saveTypeElements(){
    const serviceName = 'sedes';
    const forms = this.FormSedes.value;
    const params = {
      codigo: forms.codigo,
      nombre: forms.nombre.toUpperCase(),
      id_sede: forms.id_sede,
      url_pago_visa: forms.url_pago_visa,
      codigo_pago: forms.codigo_pago,
      estado: forms.estado,
      //userId: this.userInfo.id
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
