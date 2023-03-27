import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";


@Component({
  selector: 'app-m-new-encuentros',
  templateUrl: './m-new-encuentros.component.html',
  styleUrls: ['./m-new-encuentros.component.scss']
})
export class MNewEncuentrosComponent implements OnInit {

  loading:boolean = false
  fromEncuentros: any = FormGroup
  //color_active2 = new FormControl('')
  @Input() item: any;
  @Input() code: any;
  @Input() userInfo: any;
  constructor(public activeModal: NbDialogRef<MNewEncuentrosComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fielsReactive();
  }

  private fielsReactive() {
    const controls = {
      upeuequipo_id: ['',[Validators.required]],
      upeurival_id: ['',[Validators.required]],
      fecha: ['',[Validators.required]],
      hora: ['',[Validators.required]],
      lugar: ['',[Validators.required]],
      etapa: ['',[Validators.required]],
      estado: ['1'],
    };
    this.fromEncuentros = this.fb.group(controls)
    if(this.code === 'UPDATE'){
      this.setData();
    }
  }

  setData(){
    this.fromEncuentros.patchValue({
      estado: this.item.estado,
      upeuequipo_id:this.item.upeuequipo_id,
      upeurival_id:this.item.upeurival_id,
      fecha:this.item.fecha,
      hora:this.item.hora,
      lugar:this.item.lugar,
      etapa:this.item.etapa,
    })
  }
  closeModal(){
    this.activeModal.close('close');
  }
  save(){
    const serviceName = 'upeuencuentros';
    const forms = this.fromEncuentros.value;
    const params = {
      estado: forms.estado,
      upeuequipo_id:forms.upeuequipo_id,
      upeurival_id:forms.upeurival_id,
      fecha:forms.fecha,
      hora:forms.hora,
      lugar:forms.lugar,
      etapa:forms.etapa,
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
