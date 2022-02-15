import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';

@Component({
  selector: 'app-zoom-course',
  templateUrl: './zoom-course.component.html',
  styleUrls: ['./zoom-course.component.scss']
})
export class ZoomCourseComponent implements OnInit {
  loading: boolean = false;
  @Input() item:any;
  formHeader: any = FormGroup;
  constructor(public activeModal: NbDialogRef<ZoomCourseComponent>, private generalServi: GeneralService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      id_escuela: [''],
      ciclo: [''],
    };
    this.formHeader = this.formBuilder.group(controls);
  }
  closeModal() {
    this.activeModal.close('close');
  }

}
