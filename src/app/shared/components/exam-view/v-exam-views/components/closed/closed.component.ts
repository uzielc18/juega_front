import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-closed',
  templateUrl: './closed.component.html',
  styleUrls: ['./closed.component.scss']
})
export class ClosedComponent implements OnInit, OnChanges {
  @Input() alternativas:any = [];
  @Input() information:any;
  @Input() role: any;
  @Output() saves: EventEmitter<any> = new EventEmitter();
  constructor() { }
  ngOnChanges():void {
    this.alternativas = JSON.parse(JSON.stringify(this.alternativas));
    this.information = JSON.parse(JSON.stringify(this.information));
  }
  ngOnInit(): void {
  }
  savePuntos(item:any) {
    // console.log(item);
    
    this.saves.emit(item);
  }
}
