import { KeyValuePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { HomeworkFormComponent } from '../homework-form/homework-form.component';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss'],
})
export class SesionComponent implements OnInit {
  @Input() sesion: any = [];

  constructor(private dialogService: NbDialogService) {}

  ngOnInit(): void {}

  open() {
    this.dialogService.open(HomeworkFormComponent, {
      dialogClass: 'dialog-limited-height',
    });
  }
}
