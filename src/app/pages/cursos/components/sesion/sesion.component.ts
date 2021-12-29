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
  // @Input() unidades: any = [];
  @Input() sesion: any = [];
  // sesiones: any = [];

  constructor(private dialogService: NbDialogService) {}

  ngOnInit(): void {
    // console.log('------------------->', Object.values(this.unidades));
    // this.sesiones = Object.values(this.unidades);
    // console.log('sesiones-.-.-.-.', this.sesiones[0].topics);
    // console.log('sdslalalalalalal', Object.values(this.sesiones));
  }

  open() {
    this.dialogService.open(HomeworkFormComponent, {
      dialogClass: 'dialog-limited-height',
    });
  }
}
