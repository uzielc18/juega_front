import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";

@Component({
  selector: 'app-m-encuentros',
  templateUrl: './m-encuentros.component.html',
  styleUrls: ['./m-encuentros.component.scss']
})
export class MEncuentrosComponent implements OnInit {

  loading:boolean = false
  Formdatos: any = FormGroup
  defaultIcon:any = 'info-outline';
  //color_active2 = new FormControl('')
  @Input() item: any;
  @Input() code: any;
  @Input() userInfo: any;
  constructor(public activeModal: NbDialogRef<MEncuentrosComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fielsReactive();
  }

  private fielsReactive() {
    const controls = {
      upeuequipo_id: [''],
      upeurival_id: [''],
      fecha: [''],
      hora: [''],
      estado_encuentro: ['pendiente'],
      estado: ['1'],
      score_equipo: ['1'],
      score_rival: ['1'],
    };
    this.Formdatos = this.fb.group(controls)
    if(this.code === 'UPDATE'){
      this.setData();
    }
  }

  setData(){
    this.Formdatos.patchValue({
      upeuequipo_id: this.item.upeuequipo_id,
      upeurival_id: this.item.upeurival_id,
      fecha: this.item.fecha,
      hora: this.item.hora,
      estado_encuentro: this.item.estado_encuentro,
      estado: this.item.estado,
      score_equipo: this.item.score_equipo,
      score_rival: this.item.score_rival,
    })
  }
  closeModal(){
    this.activeModal.close('close');
  }
  saveTypeElements(){
    const serviceName = 'upeuencuentros';
    const forms = this.Formdatos.value;
    const params = {
      upeuequipo_id: forms.upeuequipo_id,
      upeurival_id: forms.upeurival_id,
      fecha:forms.fecha,
      hora: forms.hora,
      estado_encuentro: forms.estado_encuentro,
      estado: forms.estado,
      score_equipo: forms.score_equipo,
      score_rival: forms.score_rival,
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
