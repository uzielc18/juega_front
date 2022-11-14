import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-view-img',
  templateUrl: './view-img.component.html',
  styleUrls: ['./view-img.component.scss']
})
export class ViewImgComponent implements OnInit {

  @Input() item: any;
  constructor(public activeModal: NbDialogRef<ViewImgComponent>) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.activeModal.close('');
  }
}
