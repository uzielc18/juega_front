import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-m-inquiries',
  templateUrl: './m-inquiries.component.html',
  styleUrls: ['./m-inquiries.component.scss']
})
export class MInquiriesComponent implements OnInit {

  loading: boolean = false;
  @Input() item: any;
  constructor(public activeModal: NbDialogRef<MInquiriesComponent>) { }

  ngOnInit(): void {
  }
  closeModal(){
    this.activeModal.close('');
  }

}
