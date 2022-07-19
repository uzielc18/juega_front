import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-m-note-works-home',
  templateUrl: './m-note-works-home.component.html',
  styleUrls: ['./m-note-works-home.component.scss']
})
export class MNoteWorksHomeComponent implements OnInit {

  loading: boolean = false;
  @Input() items: any;
  @Input() code: any;
  constructor(public activeModal: NbDialogRef<MNoteWorksHomeComponent>) { }


  ngOnInit(): void {
  }

  closeModal(){
    this.activeModal.close('close');
  }

}
