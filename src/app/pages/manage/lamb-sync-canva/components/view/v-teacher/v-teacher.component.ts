import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MTeacherAddCourseComponent} from "../../modals/m-teacher-add-course/m-teacher-add-course.component";
import {NbDialogService} from "@nebular/theme";
import {MTeacherComponent} from "../../modals/m-teacher/m-teacher.component";

@Component({
  selector: 'app-v-teacher',
  templateUrl: './v-teacher.component.html',
  styleUrls: ['./v-teacher.component.scss']
})
export class VTeacherComponent implements OnInit {

  @Input() docentes: any = [];
  @Input() formHeader: any;
  @Input() validateIdCanva: any;
  @Input() teachers_I: any;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();

  constructor(private dialogService: NbDialogService,) { }

  ngOnInit(): void {
  }

  openMTeacher() {
    this.dialogService
      .open(MTeacherComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          formHeader: this.formHeader,
          teachers_I: this.teachers_I
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
      if (result === 'ok') {
        this.loadingsForm.emit(true);
      }
    });
  }

}
