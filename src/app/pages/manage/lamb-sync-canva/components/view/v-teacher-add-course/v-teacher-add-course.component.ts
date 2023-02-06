import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MCourseComponent} from "../../modals/m-course/m-course.component";
import {NbDialogService} from "@nebular/theme";
import {MTeacherAddCourseComponent} from "../../modals/m-teacher-add-course/m-teacher-add-course.component";

@Component({
  selector: 'app-v-teacher-add-course',
  templateUrl: './v-teacher-add-course.component.html',
  styleUrls: ['./v-teacher-add-course.component.scss']
})
export class VTeacherAddCourseComponent implements OnInit {

  @Input() cursos_docentes: any = [];
  @Input() formHeader: any;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();

  constructor(private dialogService: NbDialogService,) { }

  ngOnInit(): void {
  }

  openMCourse() {
    this.dialogService
      .open(MTeacherAddCourseComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          formHeader: this.formHeader,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
      if (result === 'ok') {
        /*this.getTeachers();*/
      }
    });
  }
}
