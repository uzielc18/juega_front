import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";


@Component({
  selector: 'app-m-disciplinas',
  templateUrl: './m-categorias.component.html',
  styleUrls: ['./m-categorias.component.scss']
})
export class MCategoriasComponent implements OnInit {

  loading:boolean = false
  Formcategorias: any = FormGroup
  defaultIcon:any = 'info-outline';
  //color_active2 = new FormControl('')
  @Input() item: any;
  @Input() code: any;
  @Input() userInfo: any;
  constructor(public activeModal: NbDialogRef<MCategoriasComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fielsReactive();
  }

  private fielsReactive() {
    const controls = {
      name: ['',[Validators.required]],
      estado: ['1'],
    };
    this.Formcategorias = this.fb.group(controls)
    if(this.code === 'UPDATE'){
      this.setData();
    }
  }

  setData(){
    this.Formcategorias.patchValue({
      name: this.item.name,
      estado: this.item.estado,
    })
  }
  closeModal(){
    this.activeModal.close('close');
  }
  save(){
    const serviceName = 'upeucategoriasEquipos';
    const forms = this.Formcategorias.value;
    const params = {
      nombre: forms.name.toUpperCase(),
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
