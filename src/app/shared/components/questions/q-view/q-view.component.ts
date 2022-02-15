import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-q-view',
  templateUrl: './q-view.component.html',
  styleUrls: ['./q-view.component.scss']
})
export class QViewComponent implements OnInit, OnChanges {
  @Input() object:any;
  constructor() { }
  ngOnChanges():void {
    this.object = this.object;
  }
  ngOnInit(): void {
  }

}
