import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GeneralService } from 'src/app/providers';

@Component({
  selector: 'app-course-home',
  templateUrl: './course-home.component.html',
  styleUrls: ['./course-home.component.scss']
})
export class CourseHomeComponent implements OnInit {
  loading: boolean = false;
  formHeader: any = FormGroup;
  constructor(private generalServi: GeneralService, private formBuilder: FormBuilder) { }

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

}
