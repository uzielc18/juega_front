import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-m-activities',
  templateUrl: './m-activities.component.html',
  styleUrls: ['./m-activities.component.scss']
})
export class MActivitiesComponent implements OnInit {

  @Input() item:any;
  loading: boolean = false
  constructor(public activateModal: NbDialogRef<MActivitiesComponent>) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.activateModal.close('close');
  }
}
