import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-copy-elements',
  templateUrl: './copy-elements.component.html',
  styleUrls: ['./copy-elements.component.scss']
})
export class CopyElementsComponent implements OnInit {

  loading: boolean = false;
  @Input() item: any;
  constructor(public activeModal: NbDialogRef<CopyElementsComponent>,) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.activeModal.close('close');
  }
}
