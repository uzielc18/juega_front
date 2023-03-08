import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";

@Component({
  selector: 'app-m-type-elements',
  templateUrl: './m-tipo-contratos.component.html',
  styleUrls: ['./m-tipo-contratos.component.scss']
})
export class MTipoContratosComponent implements OnInit {

  loading:boolean = false
  FormTipoContratos: any = FormGroup
  defaultIcon:any = 'info-outline';
  niveles:any;
  //color_active2 = new FormControl('')
  @Input() item: any;
  @Input() code: any;
  @Input() userInfo: any;
  constructor(public activeModal: NbDialogRef<MTipoContratosComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fielsReactive();
    this.listnivelEnsenanza();
  }

  private fielsReactive() {
    const controls = {
      nivel_ensenanza_id: ['',[Validators.required]],
      id_tipo_contrato: ['0'],
      id_tipo_programas: ['0'],
      codigo: ['',[Validators.required, Validators.maxLength(4)]],
      nombre: ['',[Validators.required]],
      abr: ['',[Validators.min(3)]],
      estado: ['1'],
    };
    this.FormTipoContratos = this.fb.group(controls)
    if(this.code === 'UPDATE'){
      this.setData();
    }
  }

  setData(){
    this.FormTipoContratos.patchValue({
      nivel_ensenanza_id: this.item.nivel_ensenanza_id,
      id_tipo_contrato: this.item.id_tipo_contrato,
      id_tipo_programas: this.item.id_tipo_programas,
      codigo: this.item.codigo,
      nombre: this.item.nombre,
      abr: this.item.abr,
      estado: this.item.estado,
    })
  }
  closeModal(){
    this.activeModal.close('close');
  }
  listnivelEnsenanza(){
    const serviceName = 'nivelEnsenanzas';
    this.generalService.nameAll$(serviceName).subscribe(resp => {
      this.niveles = resp.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }
  save(){
    const serviceName = 'tipoContratos';
    const forms = this.FormTipoContratos.value;
    const params = {
      codigo: forms.codigo,
      nombre: forms.nombre.toUpperCase(),
      nivel_ensenanza_id: forms.nivel_ensenanza_id,
      id_tipo_contrato: forms.id_tipo_contrato,
      id_tipo_programas: forms.id_tipo_programas,
      abr: forms.abr,
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
