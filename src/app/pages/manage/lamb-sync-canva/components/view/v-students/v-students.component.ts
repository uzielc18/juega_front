import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MTeacherComponent} from "../../modals/m-teacher/m-teacher.component";
import {NbDialogService} from "@nebular/theme";
import {MStudentsComponent} from "../../modals/m-students/m-students.component";

@Component({
  selector: 'app-v-students',
  templateUrl: './v-students.component.html',
  styleUrls: ['./v-students.component.scss']
})
export class VStudentsComponent implements OnInit {

  @Input() estudiantes: any = [];
  @Input() formHeader: any;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();

  constructor(private dialogService: NbDialogService,) { }

  ngOnInit(): void {
  }

  openMStudents() {
    this.dialogService
      .open(MStudentsComponent, {
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
