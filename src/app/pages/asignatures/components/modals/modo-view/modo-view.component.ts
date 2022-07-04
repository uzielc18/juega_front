import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';

@Component({
  selector: 'app-modo-view',
  templateUrl: './modo-view.component.html',
  styleUrls: ['./modo-view.component.scss']
})
export class ModoViewComponent implements OnInit {
  loading:boolean = false;
  formHeader: any = FormGroup;
  @Input() item:any;
  constructor(public activeModal: NbDialogRef<ModoViewComponent>,private generalService: GeneralService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.item, 'topiccss');
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      modo: ['', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    if (this.item && this.item.modo) {
      this.formHeader.controls['modo'].setValue(this.item.modo);
    }
  }
  closeModal() {
    this.activeModal.close('close');
  }
  saveModo() {
    const serviceName = 'topics';
    const params = {
      modo: this.formHeader.value.modo,
    }
    this.loading = true;
    this.generalService.updateNameIdData$(serviceName, this.item.id, params).subscribe(res => {
      if (res.success) {
        this.activeModal.close('ok');
      }
    }, () => {this.loading = false;}, () => {this.loading = false})
  }
}
