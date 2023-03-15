import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";

@Component({
  selector: 'app-m-equipos',
  templateUrl: './m-equipos.component.html',
  styleUrls: ['./m-equipos.component.scss']
})
export class MEquiposComponent implements OnInit {

  loading: boolean = false;
  disciplinasData: any = []
  categoriasData: any = []
  formHeader: any = FormGroup;
  constructor(public activeModal: NbDialogRef<MEquiposComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fieldReactive()
  }
  private fieldReactive() {
    const controls = {
      diciplina: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      equipos: ['', [Validators.required]],
      grupos: ['', [Validators.required]],

    }
    this.formHeader = this.fb.group(controls);
    this.getDisciplina();
    this.getCategory();
  }

  closeModal() {
    this.activeModal.close('')
  }

  getDisciplina(){
    this.loading = true
    const serviceName = 'upeudisciplinas';
    this.generalService.nameAll$(serviceName).subscribe(resp => {
      this.disciplinasData = resp.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }

  getCategory(){
    this.loading = true
    const serviceName = 'upeucategoriasEquipos';
    this.generalService.nameAll$(serviceName).subscribe(resp => {
      this.categoriasData = resp.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }

}
