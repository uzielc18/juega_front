import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-forum',
  templateUrl: './v-forum.component.html',
  styleUrls: ['./v-forum.component.scss']
})
export class VForumComponent implements OnInit {
  @Input() element: any;
  @Input() userInfo: any;

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
