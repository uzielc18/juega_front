import {Component, OnDestroy, OnInit} from '@angular/core';
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";
import {AppService} from "../../../../core";
import {ActivatedRoute} from "@angular/router";
import {Subject, Subscription} from "rxjs";
import {EmitEventsService} from "../../../../shared/services/emit-events.service";
import {ChartConfiguration, ChartData, ChartEvent} from "chart.js";

@Component({
  selector: 'app-user-perfil-home',
  templateUrl: './user-perfil-home.component.html',
  styleUrls: ['./user-perfil-home.component.scss'],
})
export class UserPerfilHomeComponent implements OnInit, OnDestroy {
  recuperarEmail:any = this.activatedRoute.snapshot.paramMap.get('email');
  status: any;
  me: any
  email: any;
  profile: any;
  loading: boolean = false
  person: any;
  notas: any = [];
  listCourses: any = [];
  listInquiries: any = [];
  listTutoria: any = [];
  listElections: any = [];
  datoSubscription: any = Subscription;


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

  constructor( private generalService: GeneralService,
               private userService: AppService,
               private activatedRoute: ActivatedRoute,
               private emitEventsService: EmitEventsService,) {}

  ngOnInit(): void {
    this.me = this.userService.user.person.id
    this.email = this.recuperarEmail;
    this.getUser();
    this.datoSubscription = this.emitEventsService.returnsEmail().subscribe(value => { // para emitir evento desde la cabecera
      if(value){
        this.email = value;
        this.getUser();
      }
    });
  }


  ngOnDestroy(): void {
      this.datoSubscription.unsubscribe();
  }
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    const val = JSON.parse(sesion);
    if (val && val.rol) {
      return val;
    } else {
      return '';
    }
  }
  getUser(){
    this.loading = true
    const serviceName = END_POINTS.base_back.user + '/perfil-publico';
    const params = {
      view: 'full'
    }
    this.generalService.nameIdParams$(serviceName, this.email ,params).subscribe((res:any) => {
      if(res.success){
        this.status = res.success
        this.profile = res.data;
        this.doughnut(this.profile);
        this.getInquiries(this.profile?.user?.person.id);
        if(this.rolSemestre?.rol?.name !== 'Estudiante' && this.rolSemestre?.rol?.name !== 'Docente' || this.profile?.user?.person?.id === this.me){
          this.getEvaluaciones(this.profile?.user?.person);
        }else{
          this.loading = false
        }

      }
    }, () => {this.loading = false})
  }
  getEvaluaciones(person: any){
    const serviceName = END_POINTS.base_back.persons + '/reporte-notas';
      this.person = this.profile?.user.person
      this.generalService.nameId$(serviceName, person?.id).subscribe(res => {
        this.notas = res.data
      },()=> {
        this.loading = false
      }, () => {this.loading = false})
  }

  getInquiries(person_id: any){
    const serviceName = 'inquiries-tutoria';
    this.generalService.nameId$(serviceName, person_id).subscribe( res => {
        this.listInquiries = res.data
        this.listInquiries.map((m: any) => {
          m.checked = false
          m.vermas = false
        })
        this.listInquiries.filter((f: any) => {
            if(f.tabla === 'tutoria'){
                this.listTutoria = f
            }else{
                this.listElections = f
            }
        })
    }
    )
  }
  emitEventToChild($event: any) {
    this.getUser()
  }
  doughnut(profile: any){
    console.log(profile)
    this.doughnutChartData.datasets = [];
    this.doughnutChartLabels = Object.keys(profile?.info);
    const trabajos_por_completar: any = profile?.info?.trabajos_por_completar
    const trabajos_vencidos: any = profile?.info?.trabajos_vencidos;
    const trabajos_completados: any = profile?.info?.trabajos_completados;
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
