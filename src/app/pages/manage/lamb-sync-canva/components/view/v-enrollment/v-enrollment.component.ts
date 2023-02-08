import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MTeacherComponent} from "../../modals/m-teacher/m-teacher.component";
import {NbDialogService} from "@nebular/theme";
import {MEnrollmentCanvaComponent} from "../../modals/m-enrollment-canva/m-enrollment-canva.component";

@Component({
  selector: 'app-v-enrollment',
  templateUrl: './v-enrollment.component.html',
  styleUrls: ['./v-enrollment.component.scss']
})
export class VEnrollmentComponent implements OnInit {

  @Input() matriculas: any = [];
  @Input() formHeader: any;
  @Input() validateIdCanva: any;
  @Input() enrollments: any;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();

  constructor(private dialogService: NbDialogService,) { }

  ngOnInit(): void {
  }

  openMEnrollment() {
    this.dialogService
      .open(MEnrollmentCanvaComponent, {
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
