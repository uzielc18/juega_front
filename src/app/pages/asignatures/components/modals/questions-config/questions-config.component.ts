import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-questions-config',
  templateUrl: './questions-config.component.html',
  styleUrls: ['./questions-config.component.scss']
})
export class QuestionsConfigComponent implements OnInit {
  loading:boolean = false;
  @Input() item:any;
  constructor(public activeModal: NbDialogRef<QuestionsConfigComponent>) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.activeModal.close('close');
  }
}
