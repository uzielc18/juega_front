import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";

@Component({
  selector: 'app-m-nivel-ensenanza',
  templateUrl: './m-nivel-ensenanza.component.html',
  styleUrls: ['./m-nivel-ensenanza.component.scss']
})
export class MNivelEnsenanzaComponent implements OnInit {

  loading:boolean = false
  FormNivelEnsenanza: any = FormGroup
  defaultIcon:any = 'info-outline';
  //color_active2 = new FormControl('')
  @Input() item: any;
  @Input() code: any;
  @Input() userInfo: any;
  constructor(public activeModal: NbDialogRef<MNivelEnsenanzaComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fielsReactive();
  }

  private fielsReactive() {
    const controls = {
      codigo: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      id_nivel_ensenanza: [''],
      descripcion: [''],
      estado: ['1'],
    };
    this.FormNivelEnsenanza = this.fb.group(controls)
    if(this.code === 'UPDATE'){
      this.setData();
    }
  }

  setData(){
    this.FormNivelEnsenanza.patchValue({
      codigo: this.item.codigo,
      nombre: this.item.nombre,
      id_nivel_ensenanza: this.item.id_nivel_ensenanza,
      descripcion: this.item.descripcion,
      estado: this.item.estado,
    })
  }
  closeModal(){
    this.activeModal.close('close');
  }
  save(){
    const serviceName = 'nivelEnsenanzas';
    const forms = this.FormNivelEnsenanza.value;
    const params = {
      codigo: forms.codigo,
      nombre: forms.nombre.toUpperCase(),
      id_nivel_ensenanza: forms.id_nivel_ensenanza,
      descripcion: forms.descripcion,
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
