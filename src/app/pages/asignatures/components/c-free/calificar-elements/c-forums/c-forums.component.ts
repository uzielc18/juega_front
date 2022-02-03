import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-forums',
  templateUrl: './c-forums.component.html',
  styleUrls: ['./c-forums.component.scss']
})
export class CForumsComponent implements OnInit, OnChanges {
  loading: boolean = false;
  @Input() pending:any;
  @Input() datos:any;
  @Input() element:any;
  @Input() userInfo:any;
  @Input() listResponses:any = [];
  constructor() { }
  ngOnChanges():void {
    this.pending = this.pending;
    this.datos = this.datos;
    this.element = this.element;
    this.userInfo = this.userInfo;
    this.listResponses = this.listResponses;
    // console.log(this.datos);

  }
  ngOnInit(): void {
  }


}
