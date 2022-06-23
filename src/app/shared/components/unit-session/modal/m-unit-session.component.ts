import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-m-unit-session',
  templateUrl: './m-unit-session.component.html',
  styleUrls: ['./m-unit-session.component.scss']
})
export class MUnitSessionComponent implements OnInit {

  loading:boolean = false;
  @Input() userInfo:any
  @Input() items:any
  constructor(public activeModal: NbDialogRef<MUnitSessionComponent>) { }

  ngOnInit(): void {

  }

  closeModal(){
    this.activeModal.close('close');
  }

}
