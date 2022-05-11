import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-m-details-calendar',
  templateUrl: './m-details-calendar.component.html',
  styleUrls: ['./m-details-calendar.component.scss']
})
export class MDetailsCalendarComponent implements OnInit {
  loading:boolean = false;
  @Input() datos:any;
  constructor(public activeModal: NbDialogRef<MDetailsCalendarComponent>) { }

  ngOnInit(): void {
    console.log(this.datos);
    
  }
  closeModal() {
    this.activeModal.close('close');
  }
}
