import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { HomeworkFormComponent } from '../homework-form/homework-form.component';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss'],
})
export class SesionComponent implements OnInit {
  constructor(private dialogService: NbDialogService) {}

  ngOnInit(): void {}

  open() {
    this.dialogService.open(HomeworkFormComponent, {
      dialogClass: 'dialog-limited-height',
    });
  }
}
