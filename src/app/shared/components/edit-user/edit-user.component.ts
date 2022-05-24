import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  @Input() user: any;
  @Input() rol: any;

  constructor(public activeModal: NbDialogRef<EditUserComponent>) {}

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close('close');
  }
}
