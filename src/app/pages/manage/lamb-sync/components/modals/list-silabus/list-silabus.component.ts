import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-list-silabus',
  templateUrl: './list-silabus.component.html',
  styleUrls: ['./list-silabus.component.scss']
})
export class ListSilabusComponent implements OnInit {

  @Input() item: any = [];
  loading: boolean = false;
  page = 4;

  constructor(public activeModal: NbDialogRef<ListSilabusComponent>) { }

  ngOnInit(): void {
    console.log(this.item);
  }

  closeModal() {
    this.activeModal.close('close');
  }


}
