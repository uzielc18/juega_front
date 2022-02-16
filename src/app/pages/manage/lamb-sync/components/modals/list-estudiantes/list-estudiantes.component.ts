import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-list-estudiantes',
  templateUrl: './list-estudiantes.component.html',
  styleUrls: ['./list-estudiantes.component.scss']
})
export class ListEstudiantesComponent implements OnInit {

  @Input() item: any = [];
  loading: boolean = false;
  page = 4;

  constructor(public activeModal: NbDialogRef<ListEstudiantesComponent>) { }

  ngOnInit(): void {
    console.log(this.item);
  }

  closeModal() {
    this.activeModal.close('close');
  }

}
