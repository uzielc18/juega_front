import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {NbAuthResult, NbAuthService} from "@nebular/auth";
import {DOCUMENT} from "@angular/common";
import {finalize} from "rxjs/operators";
import {NbToastRef, NbToastrService} from "@nebular/theme";
import { CoreOptions, CORE_OPTIONS } from 'src/app/core/core.options';

@Component({
  selector: 'app-auth-route-login',
  templateUrl: './auth-route-login.component.html',
  styleUrls: ['./auth-route-login.component.scss']
})
export class AuthRouteLoginComponent {

  spinner = false;
  isAuthenticated = this.authService.isAuthenticated();
  backgroundImg: string[] = [
    'https://1.bp.blogspot.com/-RIHDZsrLNMY/XIAcoVUepjI/AAAAAAABNvw/jDBZKWrXVcAoO4GNC2LkgZ6GGwUj1t1twCLcBGAs/s1600/universidad-peruana-union2.jpg',
    // 'https://www.upeu.edu.pe/fia/wp-content/uploads/sites/2/2018/03/upeu-lima.jpg',
    // 'https://www.upeu.edu.pe/wp-content/uploads/2018/11/Edificio-Administrativo-Juliaca.jpg',
    // 'https://www.upeu.edu.pe/wp-content/uploads/2020/01/EP-de-Medicina-Humana-de-la-UPeU-es-registrada-en-el-directorio-mundial-de-escuelas-de-medicina1-1500x750.jpg',
    // 'https://cepre.upeu.edu.pe/wp-content/uploads/2020/06/UPeU-Juliaca-2018.jpg'
  ]

  constructor(
    private nbToastrService: NbToastrService,
    private authService: NbAuthService,
    @Inject(DOCUMENT) protected document: any,
    @Inject(CORE_OPTIONS) protected config: CoreOptions) {
  }

  lamb = (): void => this.handle(this.config.strategyName);

  google = (): void => this.handle(this.config.strategyGoogleName);

  azure = (): void => this.handle(this.config?.strategyAzureName);



  handle(strategyName: any): void {
    const toastRef: NbToastRef = this.nbToastrService.success('Validando estrategia de autenticación...', 'Iniciando sesion...');
    this.spinner = true;

    this.authService.authenticate(strategyName)
      .pipe(finalize(() => {
        this.spinner = false;
        toastRef.close();
      }))
      .subscribe((authResult: NbAuthResult) => {
        if (authResult.isSuccess() && authResult.getRedirect()) {
          this.document.location.href = authResult.getRedirect();
        }
      })
  }


  get background(): any {
    return {
      'background-position': 'center',
      'background-repeat': 'no-repeat',
      'background-size': 'cover',
      'background-image': `url(${this.backgroundImg[Math.floor(Math.random() * this.backgroundImg.length)]})`
    }
  }

}
