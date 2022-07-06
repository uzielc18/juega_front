import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-v-est-true-false',
  templateUrl: './v-est-true-false.component.html',
  styleUrls: ['./v-est-true-false.component.scss']
})
export class VEstTrueFalseComponent implements OnInit, OnChanges {
  @Input() alternativas:any = [];
  @Output() saveValues = new EventEmitter<any>();
  constructor() { }
  ngOnChanges():void {
    this.alternativas = JSON.parse(JSON.stringify(this.alternativas));
  }
  ngOnInit(): void {
  }
  changeValue(item:any) {
    this.alternativas.map((re:any) => {
      re.checked = false;
      re.selected = 0;
    })
    item.checked = true;
    item.selected = 1;
    setTimeout(() => {
      this.saveResponse();
    }, 1000);
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
  get validButoms() {
    if (this.alternativas.length>0) {
      const array = this.alternativas.filter((r:any) => r.checked);
      if (array.length>0) {
        return false;
      } else {
        return true;
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
}