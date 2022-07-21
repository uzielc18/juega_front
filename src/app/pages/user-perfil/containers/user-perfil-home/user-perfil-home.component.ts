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
  email: any;
  profile: any;
  loading: boolean = false
  datoSubscription: any = Subscription;
  constructor( private generalService: GeneralService,
               private userService: AppService,
               private activatedRoute: ActivatedRoute,
               private emitEventsService: EmitEventsService,) {}

  ngOnInit(): void {
    this.email = this.recuperarEmail;
    this.getUser();
    this.datoSubscription = this.emitEventsService.returnsEmail().subscribe(value => { // para emitir evento desde la cabecera
      console.log(value)
      if(value){
        this.email = value;
        this.getUser();
      }
    });
  }
  ngOnDestroy(): void {
      this.datoSubscription.unsubscribe();
  }
  getUser(){
    this.loading = true
    const serviceName = END_POINTS.base_back.user + '/perfil-publico';
    const params = {
      view: 'full'
    }
    this.generalService.nameIdParams$(serviceName, this.email ,params).subscribe((res:any) => {
      if(res.success){
        this.profile = res.data;
      }
    }, () => {this.loading = false;}, () => {this.loading = false})
  }

}
