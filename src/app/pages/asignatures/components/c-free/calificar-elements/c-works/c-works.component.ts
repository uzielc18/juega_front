import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-works',
  templateUrl: './c-works.component.html',
  styleUrls: ['./c-works.component.scss']
})
export class CWorksComponent implements OnInit, OnChanges {
  datosFile: any;
  datosUrl: any;
  loading: boolean = false;
  @Input() pending: any = [];
  @Input() datos:any;
  constructor() { }
  ngOnChanges(): void {
    this.pending = this.pending;
    if (!this.pending?.student_pending?.pending_files?.length) {
      this.datosFile = '';
      this.datosUrl = '';
    }
  }
  ngOnInit(): void {
  }
  fileValues($event: any) {
    if (['YOUTUBE', 'SOUNDCLOUD', 'VIMEO', 'REFERENCIA'].includes($event.ext)) {
      this.datosUrl = $event;
      this.datosFile = '';
    } else {
      this.datosFile = $event;
      this.datosUrl = '';
    }
    // console.log($event, 'fdsafsfsd')
  }
  loadingsFiles($event: boolean) {
    setTimeout(() => {
      this.loading = $event;
    }, 200);
  }
}
