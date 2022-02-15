import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-doc-multi-option',
  templateUrl: './v-doc-multi-option.component.html',
  styleUrls: ['./v-doc-multi-option.component.scss']
})
export class VDocMultiOptionComponent implements OnInit, OnChanges {
  @Input() alternativas:any = [];
  constructor() { }
  ngOnChanges():void {
    this.alternativas = this.alternativas;
  }
  ngOnInit(): void {
  }

}
