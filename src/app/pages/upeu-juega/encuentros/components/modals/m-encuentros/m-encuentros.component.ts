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
  formHeader: any = FormGroup
  defaultIcon:any = 'info-outline';
  campeonatos:any = [];
  disciplinasData: any = [];
  Datas: any = [];
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
      campeonato: [''],
      diciplina: [''],
    };
    this.formHeader = this.fb.group(controls)
    this.listCampeonatos();
  }

  closeModal(){
    this.activeModal.close('close');
  }
  listCampeonatos(){
    this.loading = true
    const serviceName = 'upeucampeonatos';
    this.generalService.nameAll$(serviceName).subscribe(resp => {
      this.campeonatos = resp.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }

  selectCampeonato(item:any){
    this.disciplinasData = [];
    this.formHeader.controls['diciplina'].setValue();
    this.formHeader.controls['campeonato'].setValue(item);
    this.formHeader.controls['diciplina'].enable();
    this.getDisciplina(item.id);
  }

  getDisciplina(campeonato: any){
    const serviceName = 'upeudisciplinas';
    const param={campeonato_id: campeonato || null,};
    this.loading = true;
    this.generalService.nameParams$(serviceName,param).subscribe(res => {
      this.disciplinasData = res.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }

  Procesar() {
      const serviceName = 'encuentros-procesar';
      const formData = this.formHeader.value
      this.loading = true;
      this.generalService.nameIdAndId$(serviceName, formData.campeonato.id, formData.diciplina).subscribe( res => {
        this.Datas=res.data;
      }, () => {this.loading = false}, () => {this.loading = false})
  }


  save(){
    const serviceName = 'encuentros-procesar-save';
    const params = {
      encuentros: this.Datas.equipos_save
    };
    this.loading = true;
    this.generalService.addNameData$(serviceName, params).subscribe((res:any) => {
      if (res.success) {
        this.activeModal.close('ok');
      }
    }, () => {this.loading = false;}, () => {this.loading = false;});

  }

}
