import {Component, OnDestroy, OnInit} from '@angular/core';
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";
import {AppService} from "../../../../core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {EmitEventsService} from "../../../../shared/services/emit-events.service";

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
  datoSubscription: any = Subscription;
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
      },()=>this.loading = false, () => {this.loading = false})
  }

}
