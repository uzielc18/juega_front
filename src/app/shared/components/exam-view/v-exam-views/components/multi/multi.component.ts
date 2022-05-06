import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi',
  templateUrl: './multi.component.html',
  styleUrls: ['./multi.component.scss']
})
export class MultiComponent implements OnInit, OnChanges {
  @Input() alternativas:any = [];
  @Input() information:any;
  constructor() { }
  ngOnChanges():void {
    this.alternativas = JSON.parse(JSON.stringify(this.alternativas));
    this.information = JSON.parse(JSON.stringify(this.information));
  }
  ngOnInit(): void {
  }
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
