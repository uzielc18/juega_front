import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-confirm-finish-exam',
  templateUrl: './confirm-finish-exam.component.html',
  styleUrls: ['./confirm-finish-exam.component.scss']
})
export class ConfirmFinishExamComponent implements OnInit {
  loading: boolean = false;
  @Input() datos:any;
  constructor(public activeModal: NbDialogRef<ConfirmFinishExamComponent>,
    private service: GeneralService) { }

  ngOnInit(): void {
    // console.log(this.datos);
    
  }
  closeModal() {
    this.activeModal.close('close');
  }
  verQuestion() {
    this.activeModal.close('view-question');
  }
  finish() {
    const serviceName = END_POINTS.base_back.quiz + '/terminar';
    this.loading = true;
    this.service.updateNameId$(serviceName, this.datos.exam_student_id).subscribe(res => {
      if (res.success) {
        this.activeModal.close('ok');
      }
    }, () => {this.loading = false;}, () => {this.loading = false;});
   
  }
}
