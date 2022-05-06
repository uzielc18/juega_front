import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-unique',
  templateUrl: './unique.component.html',
  styleUrls: ['./unique.component.scss']
})
export class UniqueComponent implements OnInit, OnChanges {
  @Input() alternativas:any = [];
  @Input() information:any;
  constructor() { }
  ngOnChanges():void {
    this.alternativas = JSON.parse(JSON.stringify(this.alternativas));
    this.information = JSON.parse(JSON.stringify(this.information));
    console.log(this.alternativas);
    
  }
  ngOnInit(): void {
  }
  // get alternativesMov() {
  //   if (this.alternativas.length>0) {
  //     const array = this.alternativas.filter((r:any) => r.option && !r.imagen);
  //     if (array.length>0) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return true;
  //   }
  // }
  colorSelected(item:any) {
    let background = '';
    if (item?.correcto?.length === 0 && item?.checked) {
      background = 'rgb(36, 151, 21)';
    }
    if (item?.checked && item?.correcto === 1) {
      background = 'rgb(36, 151, 21)';
    }
    if (item?.checked && item?.correcto === 0) {
      background = 'red';
    }
    return background;
  }
}
