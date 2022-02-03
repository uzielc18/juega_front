import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-recorded-class',
  templateUrl: './v-recorded-class.component.html',
  styleUrls: ['./v-recorded-class.component.scss']
})
export class VRecordedClassComponent implements OnInit {
  @Input() element: any;
  @Input() userInfo: any;

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
