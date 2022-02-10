import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-doc-true-false',
  templateUrl: './v-doc-true-false.component.html',
  styleUrls: ['./v-doc-true-false.component.scss']
})
export class VDocTrueFalseComponent implements OnInit, OnChanges {
  @Input() alternativas:any = [];
  constructor() { }
  ngOnChanges():void {
    this.alternativas = this.alternativas;
  }
  ngOnInit(): void {
  }

}
