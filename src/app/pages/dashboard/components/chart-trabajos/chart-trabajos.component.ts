import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-trabajos',
  templateUrl: './chart-trabajos.component.html',
  styleUrls: ['./chart-trabajos.component.scss']
})
export class ChartTrabajosComponent implements OnInit {
  @Input() progressDatos: any = [];
  constructor() { }

  ngOnInit(): void {
  }

}
