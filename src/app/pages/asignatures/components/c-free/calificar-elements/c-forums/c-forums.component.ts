import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-forums',
  templateUrl: './c-forums.component.html',
  styleUrls: ['./c-forums.component.scss']
})
export class CForumsComponent implements OnInit, OnChanges {
  loading: boolean = false;
  @Input() pending:any = [];
  constructor() { }
  ngOnChanges():void {
    this.pending = this.pending;
  }
  ngOnInit(): void {
  }

}
