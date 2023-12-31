import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";


@Component({
  selector: 'app-m-disciplinas',
  templateUrl: './m-disciplinas.component.html',
  styleUrls: ['./m-disciplinas.component.scss']
})
export class MDisciplinasComponent implements OnInit {

  loading:boolean = false
  FormDisciplinas: any = FormGroup
  //color_active2 = new FormControl('')
  @Input() item: any;
  @Input() code: any;
  @Input() userInfo: any;
  @Input() campeonato: any;
  constructor(public activeModal: NbDialogRef<MDisciplinasComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fielsReactive();
  }

  private fielsReactive() {
    const controls = {
      name: ['',[Validators.required]],
      upeucampeonato_id: [''],
      estado: ['1'],
    };
    this.FormDisciplinas = this.fb.group(controls)
    if(this.code === 'UPDATE'){
      this.setData();
    }
  }

  setData(){
    this.FormDisciplinas.patchValue({
      name: this.item.name,
      upeucampeonato_id: this.campeonato?.id || this.item.upeucampeonato_id,
      estado: this.item.estado,
    })
  }
  closeModal(){
    this.activeModal.close('close');
  }
  save(){
    const serviceName = 'upeudisciplinas';
    const forms = this.FormDisciplinas.value;
    const params = {
      name: forms.name.toUpperCase(),
      estado: forms.estado,
      upeucampeonato_id: this.campeonato?.id || forms.upeucampeonato_id,
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
