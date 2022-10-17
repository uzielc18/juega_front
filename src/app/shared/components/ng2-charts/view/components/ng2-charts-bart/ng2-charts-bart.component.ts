import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";
// @ts-ignore
@Component({
  selector: 'app-ng2-charts-bart',
  templateUrl: './ng2-charts-bart.component.html',
  styleUrls: ['./ng2-charts-bart.component.scss']
})
export class Ng2ChartsBartComponent implements OnInit{

  @Input() barChartData: any;
  @Input() barChartOptions: any;
  @Input() barChartPlugins: any;
  @Input() barChartType: any;

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  }
  constructor() { }

  ngOnInit(): void {

  }



}
