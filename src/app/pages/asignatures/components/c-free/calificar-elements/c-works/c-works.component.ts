import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-works',
  templateUrl: './c-works.component.html',
  styleUrls: ['./c-works.component.scss']
})
export class CWorksComponent implements OnInit {
  datosFile:any;
  loading: boolean = false;
  @Input() arrayFile:any = [];
  constructor() { }

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
