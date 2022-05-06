import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.scss']
})
export class OpenComponent implements OnInit, OnChanges {
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
    console.log(item);
    this.saves.emit(item);
  }
}
