import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { HomeworkFormComponent } from '../homework-form/homework-form.component';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss'],
})
export class SesionComponent implements OnInit {
  constructor(
    private windowService: NbWindowService,
  ) {}

  ngOnInit(): void {}

  openWindow() {
    this.windowService.open(HomeworkFormComponent, { title: `Window` });
  }
}
