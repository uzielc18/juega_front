import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";

@Component({
  selector: 'app-m-type-elements',
  templateUrl: './m-pagos.component.html',
  styleUrls: ['./m-pagos.component.scss']
})
export class MPagosComponent implements OnInit {

  loading:boolean = false
  FormPagos: any = FormGroup
  defaultIcon:any = 'globe-outline';
  //color_active2 = new FormControl('')
  @Input() item: any;
  @Input() code: any;
  @Input() userInfo: any;
  constructor(public activeModal: NbDialogRef<MPagosComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fielsReactive();
  }

  private fielsReactive() {
    const controls = {
      area_id: [''],
      nombre: ['',[Validators.required]],
      sigla: ['',[Validators.min(4)]],
      id_areas: ['0'],
      id_padre: ['0'],
      codigo: ['',[Validators.required]],
      estado: ['1',],
    };
    this.FormPagos = this.fb.group(controls)
    if(this.code === 'UPDATE'){
      this.setData();
    }
  }

  setData(){
    this.FormPagos.patchValue({
      area_id: this.item.area_id,
      nombre: this.item.nombre,
      sigla: this.item.sigla,
      id_areas: this.item.id_areas,
      id_padre: this.item.id_padre,
      estado: this.item.estado,
      codigo: this.item.codigo,
    })
  }
  closeModal(){
    this.activeModal.close('close');
  }
  save(){
    const serviceName = 'pagosEducatemas';
    const forms = this.FormPagos.value;
    const params = {
      area_id: forms.area_id,
      nombre: forms.nombre.toUpperCase(),
      sigla: forms.sigla,
      id_areas: forms.id_areas,
      id_padre: forms.id_padre,
      codigo: forms.codigo,
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
