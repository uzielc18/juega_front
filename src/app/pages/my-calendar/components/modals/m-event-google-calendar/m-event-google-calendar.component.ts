import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-m-event-google-calendar',
  templateUrl: './m-event-google-calendar.component.html',
  styleUrls: ['./m-event-google-calendar.component.scss']
})
export class MEventGoogleCalendarComponent implements OnInit {
  loading:boolean = false;
  constructor(public activeModal: NbDialogRef<MEventGoogleCalendarComponent>) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.activeModal.close('close');
  }
}
