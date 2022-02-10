import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-doc-open',
  templateUrl: './v-doc-open.component.html',
  styleUrls: ['./v-doc-open.component.scss']
})
export class VDocOpenComponent implements OnInit, OnChanges {
  @Input() alternativas:any = [];
  constructor() { }
  ngOnChanges():void {
    this.alternativas = this.alternativas;
  }
  ngOnInit(): void {
  }

}
