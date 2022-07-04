import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-list-docente',
  templateUrl: './list-docente.component.html',
  styleUrls: ['./list-docente.component.scss']
})
export class ListDocenteComponent implements OnInit {

  @Input() item:any
  constructor(public activeModal: NbDialogRef<ListDocenteComponent>,) { }

  ngOnInit(): void {
  }

}
