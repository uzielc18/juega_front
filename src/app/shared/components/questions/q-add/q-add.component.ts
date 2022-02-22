import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-q-add',
  templateUrl: './q-add.component.html',
  styleUrls: ['./q-add.component.scss']
})
export class QAddComponent implements OnInit {
  @Output() onNivel: EventEmitter<any> = new EventEmitter();
  @Input() quizz: any;

  constructor() { }

  ngOnInit(): void {
  }

  changeValueCheck(nivel: any) {
    this.onNivel.emit(nivel);
  }
}
