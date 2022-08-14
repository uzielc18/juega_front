import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-m-home-tutores',
  templateUrl: './m-home-tutores.component.html',
  styleUrls: ['./m-home-tutores.component.scss']
})
export class MHomeTutoresComponent implements OnInit {

  loading: boolean = false
  @Input() userInfo: any
  @Input() items: any;
  constructor(public activeModal: NbDialogRef<MHomeTutoresComponent>,) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.activeModal.close('close')
  }
}
