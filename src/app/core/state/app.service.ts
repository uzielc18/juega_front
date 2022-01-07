import { Inject, Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbMenuService } from '@nebular/theme';
import { CORE_OPTIONS, CoreOptions } from '../core.options';
import { NbAuthService } from '@nebular/auth';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

export function init_app(
  configService: AppService,
  injector: Injector
): () => Observable<boolean> {
  return () => configService.init(injector);
}

@Injectable()
export class AppService {
  private _user: any = null;
  private _semestre: any = null;
  private _menu: any[] = [];
  private _usernameMenu: any[] = [];
  // private _userInfoUrl = `${this.options.apiAuth}/api/user/info`;
  private _userInfoUrl = `${this.options.apiAuth}/api/user/me`;
  private _loading = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
    private nbMenuService: NbMenuService,
    @Inject(CORE_OPTIONS) protected options: CoreOptions
  ) {
    this._usernameMenu = [
      { title: 'Perfil', icon: 'person-outline', subtag: 'profile' },
      { title: 'Cerrar sesión', icon: 'power-outline', subtag: 'logout' },
    ];
  }

  get usernameMenu(): any[] {
    return this._usernameMenu;
  }

  set usernameMenu(value: any[]) {
    this._usernameMenu = value;
  }

  get user(): any {
    return this._user;
  }

  set user(value: any) {
    this._user = value;
  }

  get menu(): any[] {
    return this._menu;
  }

  set menu(value: any[]) {
    this._menu = value;
  }

  get semestre(): any {
    return this._semestre;
  }

  set semestre(value: any) {
    this._semestre = value;
  }

  // init(injector: Injector): Observable<any> {
  //   const auth: NbAuthService = injector.get(NbAuthService);
  //   console.log('====================>', this._userInfoUrl);
  //   const token = localStorage.getItem('token');
  //   let data$ = this.httpClient.get(this._userInfoUrl, { headers: new HttpHeaders({'Authorization': 'Bearer ' + token})})
  //   data$.subscribe((data) => {
  //     console.log(data);
  //   });
  //   return data$;
  // }

  init(injector: Injector): Observable<boolean> {
    const auth: NbAuthService = injector.get(NbAuthService);
    return auth.isAuthenticated().pipe(
      switchMap((status: boolean) =>
        status
          ? this.httpClient.get(this._userInfoUrl).pipe(
              map((data: any) => data.data),
              map((data: any) => {
                if (data) {
                  if (
                    data.hasOwnProperty('user') &&
                    Object.keys(data.user).length > 0
                  ) {
                    this._user = data.user;
                    this._semestre = data.semestre;
                    console.log('====================>', this._user.roles);
                  }
                  return true;
                } else {
                  return false;
                }
              })
            )
          : of(false)
      )
    );
  }

  start = (): void => this._loading.next(true);

  stop = (): void => this._loading.next(false);

  onLoader = (): Observable<boolean> => this._loading.asObservable();
}
