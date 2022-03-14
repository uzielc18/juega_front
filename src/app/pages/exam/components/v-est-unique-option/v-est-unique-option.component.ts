import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-est-unique-option',
  templateUrl: './v-est-unique-option.component.html',
  styleUrls: ['./v-est-unique-option.component.scss']
})
export class VEstUniqueOptionComponent implements OnInit, OnChanges {
  @Input() alternativas:any = [];
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
  }
  get alternativesMov() {
    if (this.alternativas.length>0) {
      const array = this.alternativas.filter((r:any) => r.nombre && !r.adjunto);
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
