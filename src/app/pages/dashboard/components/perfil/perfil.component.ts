import {Component, Input, OnInit} from '@angular/core';
import {ChartData, ChartEvent, ChartType, ChartConfiguration} from 'chart.js';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  @Input() profile: any;
  public doughnutChartLabels: string[] = [
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
    ],

  };
  public doughnutChartType: any = 'doughnut';
  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
  }
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
      responsive: true,

  };
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {

      this.doughnut();
    }, 6000)

  }
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return '';
    }
  }
  doughnut(){
    this.doughnutChartLabels = Object.keys(this.profile?.info);
    const trabajos_por_completar: any = this.profile?.info?.trabajos_por_completar
    const trabajos_vencidos: any = this.profile?.info?.trabajos_vencidos;
    const trabajos_completados: any = this.profile?.info?.trabajos_completados;
    const obj = {
      "data": [trabajos_por_completar,trabajos_vencidos,trabajos_completados],
      "backgroundColor": [
        '#FFD372', '#FF6961', '#8CFCA4'
      ],
      "hoverBackgroundColor": [
        '#FFD372', '#FF6961', '#8CFCA4'
      ],
      "hoverBorderColor": [
        '#FFD372', '#FF6961', '#8CFCA4'
      ]

    }
    this.doughnutChartData.datasets.push(obj)
  }


}
