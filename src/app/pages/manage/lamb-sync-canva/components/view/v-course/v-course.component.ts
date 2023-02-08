import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MSyncCanvasComponent} from "../../../../teacher/components/m-sync-canvas/m-sync-canvas.component";
import {NbDialogService} from "@nebular/theme";
import {MCourseComponent} from "../../modals/m-course/m-course.component";
import {GeneralService} from "../../../../../../providers";

@Component({
  selector: 'app-v-course',
  templateUrl: './v-course.component.html',
  styleUrls: ['./v-course.component.scss']
})
export class VCourseComponent implements OnInit {

  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();
  @Input() cursos: any = [];
  @Input() formHeader: any;
  @Input() validateIdCanva: any;
  @Input() courses_I: any;
  constructor( private dialogService: NbDialogService,
               private generalService: GeneralService) { }

  ngOnInit(): void {
  }

  openMCourse() {
    this.dialogService
      .open(MCourseComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          formHeader: this.formHeader,
          courses_I: this.courses_I,
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
