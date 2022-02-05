import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DIRECTORY } from 'src/app/shared/directorios/directory';

@Component({
  selector: 'app-q-config',
  templateUrl: './q-config.component.html',
  styleUrls: ['./q-config.component.scss']
})
export class QConfigComponent implements OnInit {
  @Input() item:any
  directorio: any = DIRECTORY.base;
  arrayFile: any = [];
  formHeader: any = FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      file: ['', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
  }
  valueFile($event:any) {
    console.log($event);

    if ($event && $event.value) {
      this.formHeader.controls['file'].setValue($event.value);
    } else {
      this.formHeader.controls['file'].setValue('');
    }
  }
}
