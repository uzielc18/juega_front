import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";


@Component({
  selector: 'app-m-disciplinas',
  templateUrl: './m-campeonatos.component.html',
  styleUrls: ['./m-campeonatos.component.scss']
})
export class MCampeonatosComponent implements OnInit {

  loading:boolean = false
  Form: any = FormGroup
  defaultIcon:any = 'info-outline';
  //color_active2 = new FormControl('')
  @Input() item: any;
  @Input() code: any;
  @Input() userInfo: any;
  constructor(public activeModal: NbDialogRef<MCampeonatosComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fielsReactive();
  }

  private fielsReactive() {
    const controls = {
      name: ['',[Validators.required]],
      logo: [''],
      lema: [''],
      pagina_web: [''],
      fecha_inicio: [''],
      fecha_fin: [''],
      estado: ['1'],
    };
    this.Form = this.fb.group(controls)
    if(this.code === 'UPDATE'){
      this.setData();
    }
  }

  setData(){
    this.Form.patchValue({
      name: this.item.name,
      logo: this.item.logo,
      lema: this.item.lema,
      pagina_web: this.item.pagina_web,
      fecha_inicio: this.item.fecha_inicio,
      fecha_fin: this.item.fecha_fin,
      estado: this.item.estado,
    })
  }
  closeModal(){
    this.activeModal.close('close');
  }
  save(){
    const serviceName = 'upeucampeonatos';
    const forms = this.Form.value;
    const params = {
      name: forms.name.toUpperCase(),
      logo: forms.logo,
      lema: forms.lema,
      pagina_web: forms.pagina_web,
      fecha_inicio: forms.fecha_inicio,
      fecha_fin: forms.fecha_fin,
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
