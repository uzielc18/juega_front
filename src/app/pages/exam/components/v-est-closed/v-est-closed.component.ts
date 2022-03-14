import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-v-est-closed',
  templateUrl: './v-est-closed.component.html',
  styleUrls: ['./v-est-closed.component.scss']
})
export class VEstClosedComponent implements OnInit {
  formHeaders:any = FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      respuesta: ['', [Validators.required]]
    }
    this.formHeaders = this.formBuilder.group(controls);
  }
}
