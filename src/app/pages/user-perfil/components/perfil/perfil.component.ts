import {Component, Input, OnInit} from '@angular/core';
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";
import {EditUserComponent} from "../../../../shared/components/edit-user/edit-user.component";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import Swal from "sweetalert2";
import {AppService} from "../../../../core";
import {map} from "rxjs/operators";
import {NbAuthService, NbAuthToken, NbTokenService} from "@nebular/auth";
import {AuthStorageTokenService} from "../../../../core/auth/services/auth-storage-token.service";
import {environment} from "../../../../../environments/environment";
import {ChartConfiguration, ChartData, ChartEvent} from "chart.js";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  id_programa_estudio: any = '0';
  id_carga_curso: any = '0';
  userSimulate: any;
  @Input() profile:any;
  @Input() doughnutChartData: any;
  @Input() doughnutChartLabels: any;
  @Input() doughnutChartType: any;
  @Input() doughnutChartOptions: any;
  authToken:any = NbAuthToken;
  authPrueba: any;
  loading: boolean = false

  private url_me = `https://www.upeu.dev/lamb-patmos/backs/patmos-upeu-base-back/api/user/me`
  constructor( private generalService: GeneralService,
               private dialogService: NbDialogService,
               private toastrService: NbToastrService,
               private appService: AppService,
               private nbAuthService: NbAuthService,)
                { }

  ngOnInit(): void {
    this.userSimulate = this.appService.usersimular;

  }get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return '';
    }
  }

  get rolSimulate() {
    const sesion: any = sessionStorage.getItem('simulateUser');
    const val = JSON.parse(sesion);
    if (val && val.id) {
      return val;
    } else {
      return '';
    }
  }
  editUser(){
    this.dialogService
      .open(EditUserComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          user: this.profile,
          rol: 'user' },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
      if (result === 'ok') {
        //this.getTeachers();
      }
    });
  }
  sincCourse(){
    const serviceName = END_POINTS.base_back.config + '/cursos';
    Swal.fire({
      title: 'Sincronizar curso',
      text: '¿ Desea sincronizar ? ',
      backdrop: true,
      icon: 'question',
      // animation: true,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#014776',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      // timer: 2000,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.generalService.nameIdAndIdAndIdAndId$(serviceName, this.rolSemestre?.semestre?.nombre, 0, 0, this.profile.user.usuario_upeu).subscribe(res => {
          if(res.success){
            this.toastrService.info(status, `${res.message}`);
          }
        }, () => {this.loading = false}, () => {this.loading = false})
      }
    });

  }
  sincronizarDatos(){
    const serviceName = END_POINTS.base_back.config + '/get-info-user';
    const params = {
      user: this.profile.user.usuario_upeu,
    }
    Swal.fire({
      title: 'Sincronizar datos',
      text: '¿ Desea sincronizar ? ',
      backdrop: true,
      icon: 'question',
      // animation: true,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#014776',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      // timer: 2000,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.generalService.nameParams$(serviceName, params).subscribe(res => {
          this.toastrService.info(status, `${res.message}`);
        },() =>{this.loading = false}, () => {this.loading = false})
      }
    });
  }
  matriculaByStudent() {
    const serviceName = END_POINTS.base_back.config + '/get-enrollments';
    Swal.fire({
      title: 'Sincronizar Matrícula',
      text: '¿ Desea sincronizar ? ',
      backdrop: true,
      icon: 'question',
      // animation: true,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#014776',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      // timer: 2000,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.generalService
          .nameIdAndIdAndIdAndId$(
            serviceName,
            this.rolSemestre.semestre.nombre,
            this.id_carga_curso,
            this.profile?.person?.codigo,
            this.id_programa_estudio
          )
          .subscribe(
            (res: any) => {
              // console.log(res);
              this.toastrService.info(status, `${res.message}`);
            },
            () => {
              this.loading = false;
            },
            () => {
              this.loading = false;
            }
          );
      }
    });

    }
  simularUsuario(){
    this.loading = true;
    const tokenGet: any = {};
    const userData = this.appService;
    const serviceName = END_POINTS.base_back.configurations + '/simular';
    const data = {
      person_id: userData.user?.person?.id,
      nombres: userData.user?.person.nombres_completos,
      access_token: userData.user?.access_token,
      person_id_simular: this.profile?.user?.person?.id,
      nombres_simular:  this.profile?.user?.person?.nombres_completos,
      access_token_simular: this.profile?.user?.access_token,
    }

    this.generalService.addNameData$(serviceName, data).subscribe((res: any) => {
      sessionStorage.setItem('simulateUser', JSON.stringify(res.data))

      this.nbAuthService.getToken().subscribe((item: any) => {
        const to: any = JSON.parse(JSON.stringify(item));
        to.token.access_token = res.data.access_token_simular;
        this.updateToken(res);
      });

    }, () => {this.loading = false}, () => {this.loading = false})
  }
  updateToken(item: any){
     // @ts-ignore
    const token = JSON.parse(localStorage.getItem('__lamb_learning_token'))
    let value = JSON.parse(token.value);
          value.access_token = item.data.access_token_simular
         token.value = JSON.stringify(value)
      localStorage.setItem('__lamb_learning_token',JSON.stringify(token));
      window.location.reload();
  }
  initNew(tokenUser: any ){
    const serviceName = END_POINTS.patmos_base + '/user/me';
    console.log(serviceName)
    const params = {
      token: tokenUser.data.access_token_simular
    }
    this.generalService.apiNewToken$('GET', serviceName, params).subscribe((res: any) => {
      console.log(res, 'toke_simulate')
    })
  }
  passwordReset() {
    const userData = this.appService;
    const serviceName = 'canva-update-login';
    Swal.fire({
      title: 'Restablecer contraseña',
      text: '¿ Esta seguro de restablecer contraseña ? ',
      backdrop: true,
      icon: 'question',
      // animation: true,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#00244E',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      // timer: 2000,
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.generalService.nameId$(serviceName, userData.user?.person?.id).subscribe(res => {
          if(res.success){
          }
        }, () => {this.loading = false}, () => {this.loading = false})
      }
    });
  }
}
