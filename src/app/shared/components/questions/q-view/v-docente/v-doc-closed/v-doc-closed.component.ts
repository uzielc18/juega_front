import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-doc-closed',
  templateUrl: './v-doc-closed.component.html',
  styleUrls: ['./v-doc-closed.component.scss']
})
export class VDocClosedComponent implements OnInit, OnChanges {
  @Input() alternativas:any = [];
  constructor() { }
  ngOnChanges():void {
    this.alternativas = this.alternativas;
  }
  ngOnInit(): void {
  }


}
