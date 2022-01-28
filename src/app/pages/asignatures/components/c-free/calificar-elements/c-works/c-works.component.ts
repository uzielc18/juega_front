import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-works',
  templateUrl: './c-works.component.html',
  styleUrls: ['./c-works.component.scss']
})
export class CWorksComponent implements OnInit, OnChanges {
  datosFile:any;
  loading: boolean = false;
  @Input() pending:any = [];
  constructor() { }
  ngOnChanges():void {
    this.pending = this.pending;
    if (!this.pending?.student_pending?.pending_files?.lrngth) {
      this.datosFile = '';
    }
  }
  ngOnInit(): void {
  }
  fileValues($event:any) {
    this.datosFile = $event;
  }
  loadingsFiles($event:boolean) {
    setTimeout(() => {
      this.loading = $event;
    }, 200);
  }
}
