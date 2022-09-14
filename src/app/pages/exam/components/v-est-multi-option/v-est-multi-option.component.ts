import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-v-est-multi-option',
  templateUrl: './v-est-multi-option.component.html',
  styleUrls: ['./v-est-multi-option.component.scss']
})
export class VEstMultiOptionComponent implements OnInit, OnChanges {
  @Input() alternativas:any = [];
  @Input() pregunta: any;
  @Output() saveValues = new EventEmitter<any>();
  @Output() saveValueDelete = new EventEmitter<any>();
  constructor() { }
  ngOnChanges():void {
    this.alternativas = JSON.parse(JSON.stringify(this.alternativas));
  }
  ngOnInit(): void {
  }
  changeValue(item:any) {
    if (item.checked) {
      item.checked = false;
      item.selected = 0;

      setTimeout(() => {
        this.saveDelete(item);
      }, 1000);

    } else {
      item.checked = true;
      item.selected = 1;

      setTimeout(() => {
        this.saveResponse();
      }, 1000);
    }
  }

  get alternativesMov() {
    if (this.alternativas.length>0) {
      const array = this.alternativas.filter((r:any) => r.option && !r.imagen);
      if (array.length>0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  saveResponse() {
    const array = JSON.parse(JSON.stringify(this.alternativas));
    const response:any = [];
    array.map((r:any) => {
      if (r.checked) {
        const item = {
          option_id: r.id,
          id_election: r.id_election || null,
          respuesta: ''
        };
        response.push(item);
      }
    });
    this.saveValues.emit(response);
  }
  saveDelete(item:any) {
    if (item && item.id_election) {
      this.saveValueDelete.emit(item);
    }
  }
}
