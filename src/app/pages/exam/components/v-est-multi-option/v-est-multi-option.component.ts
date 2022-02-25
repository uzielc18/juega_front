import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-est-multi-option',
  templateUrl: './v-est-multi-option.component.html',
  styleUrls: ['./v-est-multi-option.component.scss']
})
export class VEstMultiOptionComponent implements OnInit, OnChanges {
  @Input() alternativas:any = [];
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
      const array = this.alternativas.filter((r:any) => r.nombre);
      if (array.length>0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
