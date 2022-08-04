import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-m-satisfaction',
  templateUrl: './m-satisfaction.component.html',
  styleUrls: ['./m-satisfaction.component.scss']
})
export class MSatisfactionComponent implements OnInit {

  loading: boolean = false
  @Input() item: any;
  constructor(public activeModal: NbDialogRef<MSatisfactionComponent>) { }

  ngOnInit(): void {
  }

}
