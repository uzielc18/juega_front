import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbDialogRef } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';

@Component({
  selector: 'app-response-apertura',
  templateUrl: './response-apertura.component.html',
  styleUrls: ['./response-apertura.component.scss']
})
export class ResponseAperturaComponent implements OnInit {
  loading:boolean = false;
  formHeader: any = FormGroup;
  min: any = Date;
  @Input() item:any;
  constructor(public activeModal: NbDialogRef<ResponseAperturaComponent>,private generalService: GeneralService,
    private formBuilder: FormBuilder, dateService: NbDateService<Date>, private datepipe: DatePipe) {
      let date:any = Date;
      date = dateService.today();
      this.min = dateService.addDay(date, 0);
    }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      fecha_fin: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      respuesta: ['', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
  }
  closeModal() {
    this.activeModal.close('close');
  }
  saveResponse(state:any) {
    const serviceName = 'pendings';
    const forms = this.formHeader.value;
    let f_fin = '';
    if (state === 'aceptado') {
      f_fin = this.datepipe.transform(forms.fecha_fin, 'yyyy-MM-dd') + ' ' + this.datepipe.transform(forms.hora_fin, 'HH:mm:ss');
    }
    const params = {
      fecha_fin: f_fin,
      justification: {
        id: this.item.id,
        respuesta: forms.respuesta || '',
        estado_justification: state,
      } 
    };
    this.loading = true;
    this.generalService.updateNameIdData$(serviceName, this.item.pending_id, params).subscribe((res:any) => {
      if (res.success) {
        this.activeModal.close('ok');
      }
    }, () => {this.loading = false}, () => {this.loading = false;})
  }
}
