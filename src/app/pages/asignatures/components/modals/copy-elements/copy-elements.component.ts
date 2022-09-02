import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-copy-elements',
  templateUrl: './copy-elements.component.html',
  styleUrls: ['./copy-elements.component.scss']
})
export class CopyElementsComponent implements OnInit {

  loading: boolean = false;
  @Input() item: any;
  formHeader: any = FormGroup;
  constructor(public activeModal: NbDialogRef<CopyElementsComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      copiar: [''],
      mover: [''],
      course_id: ['', [Validators.required]],
      unit_id: ['', [Validators.required]],
      section_id: ['',[Validators.required]],
    };
    this.formHeader = this.fb.group(controls);
  }
  closeModal(){
    this.activeModal.close('close');
  }
}
