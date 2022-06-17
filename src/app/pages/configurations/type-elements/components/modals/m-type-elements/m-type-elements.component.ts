import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";

@Component({
  selector: 'app-m-type-elements',
  templateUrl: './m-type-elements.component.html',
  styleUrls: ['./m-type-elements.component.scss']
})
export class MTypeElementsComponent implements OnInit {

  loading:boolean = false
  FormTypeElements: any = FormGroup
  defaultIcon:any = 'info-outline';
  //color_active2 = new FormControl('')
  @Input() item: any;
  @Input() code: any;
  @Input() userInfo: any;
  constructor(public activeModal: NbDialogRef<MTypeElementsComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fielsReactive();
  }

  private fielsReactive() {
    const controls = {
      codigo: ['',[Validators.required, Validators.maxLength(4)]],
      nombre: ['',[Validators.required]],
      color_active: ['#000',[Validators.required]],
      background: ['#000',[Validators.required]],
      color_border: ['#000',[Validators.required]],
      color_hover: ['#000',[Validators.required]],
      icono: ['',[Validators.required]],
      icono_font_size: ['',[Validators.required]],
    };
    this.FormTypeElements = this.fb.group(controls)
    if(this.code === 'UPDATE'){
      this.setData();
    }
  }

  setData(){
    this.FormTypeElements.patchValue({
      codigo: this.item.codigo,
      nombre: this.item.nombre,
      background: this.item.background,
      color_active: this.item.color_active,
      color_border: this.item.color_border,
      color_hover: this.item.color_border,
      icono: this.item.icono,
      icono_font_size: this.item.icono_font_size
    })
  }
  closeModal(){
    this.activeModal.close('close');
  }
  saveTypeElements(){
    const serviceName = 'typeElements';
    const forms = this.FormTypeElements.value;
    const params = {
      codigo: forms.codigo.toUpperCase(),
      nombre: forms.nombre.toUpperCase(),
      background: forms.background,
      color_active: forms.color_active,
      color_border: forms.color_border,
      color_hover: forms.color_border,
      icono: forms.icono,
      icono_font_size: forms.icono_font_size,
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
