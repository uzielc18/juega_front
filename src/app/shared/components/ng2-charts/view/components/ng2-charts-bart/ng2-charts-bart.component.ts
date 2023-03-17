import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
// @ts-ignore
@Component({
  selector: 'app-ng2-charts-bart',
  templateUrl: './ng2-charts-bart.component.html',
  styleUrls: ['./ng2-charts-bart.component.scss']
})
export class Ng2ChartsBartComponent implements OnInit, OnChanges {

  @Input() items: any;
  @Input() type: any;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
    public barChartOptions: ChartConfiguration['options'] = {
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      scales: {
        x: {},
        y: {
          min: 0
        }
      },
      plugins: {
        legend: {
          display: true,
        },
        datalabels: {
          anchor: 'end',
          align: 'end'
        }
      }
    };
    public barChartType: ChartType = 'bar';
    public barChartPlugins = [
      //DataLabelsPlugin
    ];

    public barChartData: ChartData<'bar'> = {
      labels: [],
      datasets: [
        {
          data:[],
          label: ''
        }
      ]
    };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  }
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.items){
      this.dataBar(this.items);
    }
  }
  ngOnInit(): void {

  }

  dataBar(item: any){
    this.barChartData.labels = []
    if(this.type ===  'DASH') {
      const datasets: any = [];
      item.labels?.forEach((f: any) => {
        this.barChartData.labels?.push(f);
      })
      item.datasets?.forEach((dataset: any) => {
        dataset.label.forEach((label: any, index: any) => {
          if (!datasets[index]) {
            datasets[index] = {
              label: label,
              data: []
            };
          }
          datasets[index].data.push(dataset.data[index]);
        });
      })
      this.barChartData.datasets = datasets

    }else {

      item.labels?.forEach((f: any) => {
        this.barChartData.labels?.push(f.titulo);
      });
      this.barChartData.datasets = this.items.datasets
    }
    this.chart?.update();
  }



}
