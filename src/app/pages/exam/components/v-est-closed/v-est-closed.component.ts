import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-v-est-closed',
  templateUrl: './v-est-closed.component.html',
  styleUrls: ['./v-est-closed.component.scss']
})
export class VEstClosedComponent implements OnInit {
  @Input() alternativas:any = [];
  @Input() pregunta: any;
  @Output() saveValues = new EventEmitter<any>();
  constructor() { }
  ngOnChanges():void {
    this.alternativas = JSON.parse(JSON.stringify(this.alternativas));
  }
  ngOnInit(): void {
  }
  saveResponse() {
    const array = JSON.parse(JSON.stringify(this.alternativas));
    const response:any = [];
    array.map((r:any) => {
        const item = {
          option_id: r.id,
          respuesta: r.respuesta || null,
          id_election: r.id_election || null,
        };
        response.push(item);
    });
    this.saveValues.emit(response);
  }
}
