import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-more-options',
  templateUrl: './more-options.component.html',
  styleUrls: ['./more-options.component.scss']
})
export class MoreOptionsComponent implements OnInit {
  loading: boolean = false;
  formHeader: any = FormGroup;
  @Input() tipo:any;
  @Output() formsValues = new EventEmitter<any>();
  @Input() setValues:any;
  @Input() code:any;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      permitir_comentarios: [false],
      duration: ['180', [Validators.required]],
      calificable: [['TRABAJO', 'FORO'].includes(this.tipo) ? true : false],
      visibilidad: ['S', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    if (this.code === 'UPDATE') {
      this.updateValues();
    }
    setTimeout(() => {
      this.formsValues.emit(this.formHeader.value);
    }, 200);
  }
  setEmiter() {
    if (this.formHeader.valid) {
      this.formsValues.emit(this.formHeader.value);
    }
  }
  updateValues() {
    this.formHeader.patchValue({
      permitir_comentarios: this.setValues.permitir_comentarios  === '1' ? true : false,
      duration: this.setValues.duracion,
      calificable: this.setValues.calificable  === '1' ? true : false,
      visibilidad: this.setValues.visibilidad   === '1' ? 'S' : 'N',
    });
  }
}
