import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";

@Component({
  selector: 'app-m-semipresencial',
  templateUrl: './m-semipresencial.component.html',
  styleUrls: ['./m-semipresencial.component.scss']
})
export class MSemipresencialComponent implements OnInit {

  loading:boolean = false
  FormSemipresencial: any = FormGroup
  defaultIcon:any = 'info-outline';
  //color_active2 = new FormControl('')
  @Input() item: any;
  @Input() code: any;
  @Input() userInfo: any;
  constructor(public activeModal: NbDialogRef<MSemipresencialComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fielsReactive();
  }

  private fielsReactive() {
    const controls = {
      id_semipresencial: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      seccion: ['',[Validators.required]],
      lugar: ['',[Validators.required]],
      ubigeo: ['',[Validators.required]],
      estado: ['1'],
    };
    this.FormSemipresencial = this.fb.group(controls)
    if(this.code === 'UPDATE'){
      this.setData();
    }
  }

  setData(){
    this.FormSemipresencial.patchValue({
      id_semipresencial: this.item.id_semipresencial,
      nombre: this.item.nombre,
      seccion: this.item.seccion,
      lugar: this.item.lugar,
      ubigeo: this.item.ubigeo,
      estado: this.item.estado,
    })
  }
  closeModal(){
    this.activeModal.close('close');
  }
  save(){
    const serviceName = 'semipresencials';
    const forms = this.FormSemipresencial.value;
    const params = {
      id_semipresencial: forms.id_semipresencial,
      nombre: forms.nombre.toUpperCase(),
      seccion: forms.seccion,
      lugar: forms.lugar,
      ubigeo: forms.ubigeo,
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
