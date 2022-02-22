import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-list-silabus',
  templateUrl: './list-silabus.component.html',
  styleUrls: ['./list-silabus.component.scss'],
})
export class ListSilabusComponent implements OnInit {
  @Input() item: any = [];
  @Input() pagination: any;

  loading: boolean = false;

  constructor(public activeModal: NbDialogRef<ListSilabusComponent>) {}

  ngOnInit(): void {
    console.log(this.item);
  }

  loadPage($event: any): any {
    this.pagination.page = $event;
  }

  closeModal() {
    this.activeModal.close('close');
  }
}
