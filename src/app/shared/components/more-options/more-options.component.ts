import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-more-options',
  templateUrl: './more-options.component.html',
  styleUrls: ['./more-options.component.scss']
})
export class MoreOptionsComponent implements OnInit, OnChanges {
  loading: boolean = false;
  formHeader: any = FormGroup;
  @Input() tipo:any;
  @Output() formsValues = new EventEmitter<any>();
  @Input() setValues:any;
  @Input() code:any;
  constructor(private formBuilder: FormBuilder) { }
  ngOnChanges():void {
    // this.setValues = JSON.parse(JSON.stringify(this.setValues));
  }
  ngOnInit(): void {
    this.fieldReactive();
    // console.log(this.tipo);

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
    } else {
      if (this.tipo === 'EVALUACION') {
          this.formHeader.controls['visibilidad'].setValue('N');
      }
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
    console.log(this.setValues, "more")
    this.formHeader.patchValue({
      permitir_comentarios: this.setValues.permitir_comentarios  === '1' ? true : false,
      duration: this.setValues.duracion,
      calificable: this.setValues.calificable  === '1' ? true : false,
      visibilidad: this.setValues.visibilidad === '1'? 'S': 'N' ,
    });
  }
}
