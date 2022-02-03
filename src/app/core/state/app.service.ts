import { Inject, Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbMenuService } from '@nebular/theme';
import { CORE_OPTIONS, CoreOptions } from '../core.options';
import { NbAuthService } from '@nebular/auth';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

// / Antes
// export function init_app(
//   configService: AppService,
//   injector: Injector
// ): () => Observable<boolean> {
//   return () => configService.init(injector);
// }

// Cambiado
export function init_app(configService: AppService, injector: Injector): any {
  return () => configService.init(injector);
}
//////
@Injectable()
export class AppService {
  private _user: any = null;
  private _semestre: any = null;
  private _rol: any = null;
  private _menu: any[] = [];
  private _usernameMenu: any[] = [];
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

  get rol(): any {
    return this._rol;
  }

  set rol(value: any) {
    this._rol = value;
  }

  init(injector: any): Promise<any> {
    return injector.get(NbAuthService).isAuthenticated().toPromise().then((isAuthent: any) => {
      if (isAuthent) {
        return this.httpClient.get(`${this._userInfoUrl}`)
          .pipe(map((data: any) => data))
          .toPromise()
          .then((data: any) => {

            if (data.data && data.data.user) {
              this._user = data.data.user;
              this._semestre = data.data.semestre;
              this._rol = data.data.roles;
              return true;
            } else {
              localStorage.clear();
              return false;
            }
          }, () => {
            localStorage.clear();
            return false;
          });
      } else {
        localStorage.clear();
        return false;
      }

    });
  }
  start = (): void => this._loading.next(true);
  stop = (): void => this._loading.next(false);

  onLoader = (): Observable<boolean> => this._loading.asObservable();
}
