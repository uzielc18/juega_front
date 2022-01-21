import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-v-document',
  templateUrl: './v-document.component.html',
  styleUrls: ['./v-document.component.scss']
})
export class VDocumentComponent implements OnInit {
  @Input() element: any;
  @Input() userInfo: any;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
