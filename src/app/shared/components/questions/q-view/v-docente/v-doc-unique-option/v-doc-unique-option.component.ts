import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-doc-unique-option',
  templateUrl: './v-doc-unique-option.component.html',
  styleUrls: ['./v-doc-unique-option.component.scss']
})
export class VDocUniqueOptionComponent implements OnInit, OnChanges {
  @Input() alternativas:any = [];
  constructor() { }
  ngOnChanges():void {
    this.alternativas = this.alternativas;
  }
  ngOnInit(): void {
  }

}
