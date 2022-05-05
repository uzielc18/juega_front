import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy } from '@angular/core';
import {
  NbAuthOAuth2Token,
  NbAuthResult,
  NbAuthService,
  NbAuthToken,
} from '@nebular/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CoreOptions, CORE_OPTIONS } from '../../../../core/core.options';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  token!: NbAuthOAuth2Token | null;
  backgroundImg: string[] = [
    'https://1.bp.blogspot.com/-RIHDZsrLNMY/XIAcoVUepjI/AAAAAAABNvw/jDBZKWrXVcAoO4GNC2LkgZ6GGwUj1t1twCLcBGAs/s1600/universidad-peruana-union2.jpg',
    // 'https://www.upeu.edu.pe/fia/wp-content/uploads/sites/2/2018/03/upeu-lima.jpg',
    // 'https://www.upeu.edu.pe/wp-content/uploads/2018/11/Edificio-Administrativo-Juliaca.jpg',
    // 'https://www.upeu.edu.pe/wp-content/uploads/2020/01/EP-de-Medicina-Humana-de-la-UPeU-es-registrada-en-el-directorio-mundial-de-escuelas-de-medicina1-1500x750.jpg',
    // 'https://cepre.upeu.edu.pe/wp-content/uploads/2020/06/UPeU-Juliaca-2018.jpg'
  ]

  private destroy$ = new Subject<void>();

  constructor(
    private authService: NbAuthService,
    private http: HttpClient,
    @Inject(CORE_OPTIONS) protected options: CoreOptions
  ) {
    this.authService
      .onTokenChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((token: NbAuthToken) => {
        this.token = null;
        if (token && token.isValid()) {
          this.token = token as NbAuthOAuth2Token;
        }
      });
  }

  loginGoogle(): void {
    this.authService
      .authenticate(this.options.strategyGoogleName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => { });
  }

  loginLamb(): void {
    this.authService
      .authenticate(this.options.strategyName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => { });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setBackground() {
    return {
      'background-position': 'center',
      'background-repeat': 'no-repeat',
      'background-size': 'cover',
      'background-image': `url(${this.backgroundImg[Math.floor(Math.random() * this.backgroundImg.length)]})`
    }
  }
}
