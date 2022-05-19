import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-m-configuration',
  templateUrl: './m-configuration.component.html',
  styleUrls: ['./m-configuration.component.scss']
})
export class MConfigurationComponent implements OnInit {
  loading:boolean = false;
  @Input() datos:any;
  formHeader: any = FormGroup;
  constructor(public activeModal: NbDialogRef<MConfigurationComponent>, private service: GeneralService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      nombre: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      tipo: [this.datos.type || '', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    if (this.datos && this.datos.method === 'UPDATE') {
      this.setValues();
    }
  }
  closeModal() {
    const retur = {
      close: 'close',
      value: '',
    }
    this.activeModal.close(retur);
  }
  saveConfig() {
    const serviceName = END_POINTS.base_back.config + '/configurations';
    const forms = this.formHeader.value;
    const params = {
      nombre: forms.nombre.toUpperCase(),
      valor: forms.valor,
      tipo: forms.tipo
    }
    this.loading = true;
    if (this.datos && this.datos.method === 'NEW') {
      this.service.addNameData$(serviceName, params).subscribe((res:any) => {
        if (res.success) {
          const retur = {
            close: 'ok',
            value: this.datos.type,
          }
          this.activeModal.close(retur);
        }
      }, () => {this.loading = false}, ()=> {this.loading=false});
    } else {
      this.service.updateNameIdData$(serviceName, this.datos.items.id, params).subscribe((res:any) => {
        if (res.success) {
          const retur = {
            close: 'ok',
            value: this.datos.type,
          }
          this.activeModal.close(retur);
        }
      }, () => {this.loading = false}, ()=> {this.loading=false});
    }
  }
  setValues() {
    this.formHeader.patchValue({
      nombre: this.datos.items.nombre,
      valor: this.datos.items.valor,
      tipo: this.datos.items.tipo,
    })
  }
}
