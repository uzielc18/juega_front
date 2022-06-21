import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-m-uni-ses',
  templateUrl: './m-uni-ses.component.html',
  styleUrls: ['./m-uni-ses.component.scss']
})
export class MUniSesComponent implements OnInit {
  loading:boolean = false;
  constructor(public activeModal: NbDialogRef<MUniSesComponent>) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.activeModal.close('close');
  }
}
