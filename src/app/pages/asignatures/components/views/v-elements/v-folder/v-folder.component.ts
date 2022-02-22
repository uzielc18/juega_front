import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-v-folder',
  templateUrl: './v-folder.component.html',
  styleUrls: ['./v-folder.component.scss']
})
export class VFolderComponent implements OnInit {
  @Input() element: any;
  @Input() userInfo: any;

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
