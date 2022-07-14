import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-m-add-session',
  templateUrl: './m-add-session.component.html',
  styleUrls: ['./m-add-session.component.scss']
})
export class MAddSessionComponent implements OnInit {

  loading:boolean = false;
  @Input() items: any;
  FormSemestre: any = FormGroup
  constructor(public activeModal: NbDialogRef<MAddSessionComponent>,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fieldsReactive();
  }

  private fieldsReactive(){
    const controls = {
      session: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
    }
    this.FormSemestre = this.fb.group(controls);
  }
  closeModal(){
    this.activeModal.close('close')
  }

}
