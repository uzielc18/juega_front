import {Component, Input, OnInit} from '@angular/core';
import {ChartData, ChartEvent, ChartType, ChartConfiguration} from 'chart.js';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  @Input() profile: any;
  @Input() doughnutChartData: any;
  @Input() doughnutChartLabels: any;
  @Input() doughnutChartType: any;
  @Input() doughnutChartOptions: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
  }
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return '';
    }
  }


  examLocation(){
    this.router.navigate([`../evaluations`], { relativeTo: this.activatedRoute.parent});
  }
  forumLocation(){
    this.router.navigate([`../forums`], { relativeTo: this.activatedRoute.parent});
  }
  worksLocation(){
    this.router.navigate([`../works`], { relativeTo: this.activatedRoute.parent});
  }


}
