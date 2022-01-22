import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-link',
  templateUrl: './v-link.component.html',
  styleUrls: ['./v-link.component.scss']
})
export class VLinkComponent implements OnInit {
  @Input() element: any;
  @Input() userInfo: any;

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
