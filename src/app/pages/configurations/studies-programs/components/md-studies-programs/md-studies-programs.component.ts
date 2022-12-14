import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {GeneralService} from "../../../../../providers";

@Component({
  selector: 'app-md-studies-programs',
  templateUrl: './md-studies-programs.component.html',
  styleUrls: ['./md-studies-programs.component.scss']
})
export class MdStudiesProgramsComponent implements OnInit {

  loading: boolean = false;
  FormEditProgramStudy: any = FormGroup
  @Input() item: any;
  @Input() code: any;
  constructor(public activeModal: NbDialogRef<MdStudiesProgramsComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fieldsReactive();
  }
  closeModal(){
    this.activeModal.close('')
  }
  private fieldsReactive(){
    const controls = {
      abr:[{value: ''}],
      nombre: [{ value: '', disabled: true }],
      id_programa_estudio: [{ value: '', disabled: true }],
      sede_nombre: [{ value: '', disabled: true }],
      id_canva: [''],
    };
    this.FormEditProgramStudy = this.fb.group(controls);

    if(this.code === 'UPDATE'){
      this.setData();
    }
  }
  setData(){
    this.FormEditProgramStudy.patchValue(
      {
        abr: this.item.abr,
        nombre: this.item.nombre,
        id_programa_estudio: this.item.id_programa_estudio,
        sede_nombre: this.item.sede_nombre,
        id_canva: this.item.id_canva
      }
    )

  }
  saveInformation(){
    const serviceName = 'programaEstudios';
    const forms = this.FormEditProgramStudy.value;
    const params = {
      abr: forms.abr,
      nombre: forms.nombre,
      id_programa_estudio: forms.id_programa_estudio,
      sede_nombre: forms.sede_nombre,
      id_canva: forms.id_canva
    }
    this.loading = true;
    this.generalService.updateNameIdData$(serviceName, this.item.id, params).subscribe(res => {
      if(res.success){
        this.activeModal.close('ok');
      }
    }, () => {this.loading = false}, () => {this.loading = false})
  }
}
