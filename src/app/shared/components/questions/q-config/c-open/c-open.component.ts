import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-c-open',
  templateUrl: './c-open.component.html',
  styleUrls: ['./c-open.component.scss']
})
export class COpenComponent implements OnInit, OnChanges {
  @Input() headParams:any;
  formHeader: any = FormGroup;
  constructor(private formBuilder: FormBuilder) { }
  ngOnChanges():void {
    this.headParams = this.headParams;
  }
  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      respuesta: ['', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
  }
  saveQuestion() {

  }
}
