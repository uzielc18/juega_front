import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.scss']
})
export class OpenComponent implements OnInit, OnChanges {
  @Input() alternativas:any = [];
  constructor() { }
  ngOnChanges():void {
    this.alternativas = JSON.parse(JSON.stringify(this.alternativas));
  }
  ngOnInit(): void {
  }

}
