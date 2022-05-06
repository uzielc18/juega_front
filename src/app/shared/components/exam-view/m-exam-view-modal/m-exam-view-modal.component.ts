import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-m-exam-view-modal',
  templateUrl: './m-exam-view-modal.component.html',
  styleUrls: ['./m-exam-view-modal.component.scss']
})
export class MExamViewModalComponent implements OnInit {
  loading: boolean = false;
  @Input() datos:any = '';
  infor:any;
  constructor(public activeModal: NbDialogRef<MExamViewModalComponent>) { }

  ngOnInit(): void {
    console.log(this.datos);
    // name
  }
  closeModal() {
    this.activeModal.close('close');
  }
  loadings($event:any) {
    setTimeout(() => {
      this.loading = $event;
    }, 100);
  }
  infoQuestion($event:any) {
    if ($event) {
      this.infor = $event;
    }
  }
}
