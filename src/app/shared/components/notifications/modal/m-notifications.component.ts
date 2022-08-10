import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-m-notifications',
  templateUrl: './m-notifications.component.html',
  styleUrls: ['./m-notifications.component.scss']
})
export class MNotificationsComponent implements OnInit {

  loading: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  closeModal(){

  }
}
