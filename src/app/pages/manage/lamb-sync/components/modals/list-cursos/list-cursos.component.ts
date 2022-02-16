import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-list-cursos',
  templateUrl: './list-cursos.component.html',
  styleUrls: ['./list-cursos.component.scss']
})
export class ListCursosComponent implements OnInit {

  @Input() cursos: any = [];
  loading: boolean = false;
  page = 4;

  constructor(public activeModal: NbDialogRef<ListCursosComponent>) { }

  ngOnInit(): void {
    console.log(this.cursos);
  }

  closeModal() {
    this.activeModal.close('close');
  }

}
