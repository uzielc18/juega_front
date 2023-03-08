import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";

@Component({
  selector: 'app-m-type-elements',
  templateUrl: './m-sede-areas.component.html',
  styleUrls: ['./m-sede-areas.component.scss']
})
export class MSedeAreasComponent implements OnInit {

  loading:boolean = false
  FormSedeAreas: any = FormGroup
  defaultIcon:any = 'info-outline';
  //color_active2 = new FormControl('')
  @Input() item: any;
  @Input() code: any;
  @Input() userInfo: any;
  constructor(public activeModal: NbDialogRef<MSedeAreasComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fielsReactive();
  }

  private fielsReactive() {
    const controls = {
      sede_id: ['',[Validators.required]],
      area_id: ['',[Validators.required]],
      id_sede_areas: [''],
      codigo: [''],
      url_pago_visa: [''],
      codigo_pago: [''],
      estado: ['1'],
    };
    this.FormSedeAreas = this.fb.group(controls)
    if(this.code === 'UPDATE'){
      this.setData();
    }
  }

  setData(){
    this.FormSedeAreas.patchValue({
      sede_id: this.item.sede_id,
      area_id: this.item.area_id,
      id_sede_areas: this.item.id_sede_areas,
      codigo: this.item.codigo,
      url_pago_visa: this.item.url_pago_visa,
      codigo_pago: this.item.codigo_pago,
      estado: this.item.estado
    })
  }
  closeModal(){
    this.activeModal.close('close');
  }
  save(){
    const serviceName = 'sedeAreas';
    const forms = this.FormSedeAreas.value;
    const params = {
      sede_id: forms.sede_id.toUpperCase(),
      area_id: forms.area_id.toUpperCase(),
      id_sede_areas: forms.id_sede_areas,
      codigo: forms.codigo,
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
