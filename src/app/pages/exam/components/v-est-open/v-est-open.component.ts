import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-v-est-open',
  templateUrl: './v-est-open.component.html',
  styleUrls: ['./v-est-open.component.scss']
})
export class VEstOpenComponent implements OnInit {
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
