import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-video',
  templateUrl: './v-video.component.html',
  styleUrls: ['./v-video.component.scss']
})
export class VVideoComponent implements OnInit {

  @Input() element: any;
  @Input() userInfo: any;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
