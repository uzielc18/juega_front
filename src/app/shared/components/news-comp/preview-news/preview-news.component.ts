import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-preview-news',
  templateUrl: './preview-news.component.html',
  styleUrls: ['./preview-news.component.scss']
})
export class PreviewNewsComponent implements OnInit {
  @Input() valuess:any;
  constructor(public activeModal: NbDialogRef<PreviewNewsComponent>) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.activeModal.close('close');
  }
  irUrl() {
    var a = document.createElement('a');
    a.target="_blank";
    a.href=this.valuess.url;
    a.click();
  }
}
