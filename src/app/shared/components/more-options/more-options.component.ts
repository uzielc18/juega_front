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
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      carpeta: [''],
      active_chat: [false],
      duration: ['180', [Validators.required]],
      calificable: [true],
      visibilidad: ['S', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.formsValues.emit(this.formHeader.value);
  }
  setEmiter() {
    if (this.formHeader.valid) {
      this.formsValues.emit(this.formHeader.value);
    }
  }
}
