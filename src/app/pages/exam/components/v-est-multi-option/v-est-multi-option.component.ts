import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-v-est-multi-option',
  templateUrl: './v-est-multi-option.component.html',
  styleUrls: ['./v-est-multi-option.component.scss']
})
export class VEstMultiOptionComponent implements OnInit, OnChanges {
  @Input() alternativas:any = [];
  @Output() saveValues = new EventEmitter<any>();
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
    } else {
      item.checked = true;
      item.selected = 1;
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
          id: r.id,
          // pregunta_id: r.pregunta_id
        };
        response.push(item);
      }
    });
    this.saveValues.emit(response);
  }
}
