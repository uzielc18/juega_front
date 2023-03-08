import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";

@Component({
  selector: 'app-m-tipo-programas',
  templateUrl: './m-tipo-programas.component.html',
  styleUrls: ['./m-tipo-programas.component.scss']
})
export class MTipoProgramasComponent implements OnInit {

  loading:boolean = false
  FormTipoProgramas: any = FormGroup
  defaultIcon:any = 'info-outline';
  //color_active2 = new FormControl('')
  @Input() item: any;
  @Input() code: any;
  @Input() userInfo: any;
  constructor(public activeModal: NbDialogRef<MTipoProgramasComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fielsReactive();
  }

  private fielsReactive() {
    const controls = {
      codigo: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      id_tipo_programas: ['0'],
      descripcion: [''],
      estado: ['1'],
    };
    this.FormTipoProgramas = this.fb.group(controls)
    if(this.code === 'UPDATE'){
      this.setData();
    }
  }

  setData(){
    this.FormTipoProgramas.patchValue({
      codigo: this.item.codigo,
      nombre: this.item.nombre,
      id_tipo_programas: this.item.id_tipo_programas,
      descripcion: this.item.color_active,
      estado: this.item.estado,
    })
  }
  closeModal(){
    this.activeModal.close('close');
  }
  save(){
    const serviceName = 'tipoProgramas';
    const forms = this.FormTipoProgramas.value;
    const params = {
      codigo: forms.codigo,
      nombre: forms.nombre.toUpperCase(),
      id_tipo_programas: forms.id_tipo_programas,
      descripcion: forms.descripcion,
      estado: forms.estado,
      userId: this.userInfo.id
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
