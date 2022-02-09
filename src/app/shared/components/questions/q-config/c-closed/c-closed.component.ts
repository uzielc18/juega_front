import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-c-closed',
  templateUrl: './c-closed.component.html',
  styleUrls: ['./c-closed.component.scss']
})
export class CClosedComponent implements OnInit, OnChanges {
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