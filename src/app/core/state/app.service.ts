import { Inject, Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbMenuService } from '@nebular/theme';
import { CORE_OPTIONS, CoreOptions } from '../core.options';
import { NbAuthService } from '@nebular/auth';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

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
  private _usersimular: any = null;
  private _configurations: any = null;
  private _semestre: any = null;
  private _rol: any = null;
  private _area: any = null;
  private _menu: any[] = [];
  private _usernameMenu: any[] = [];
  private _userInfoUrl = `${this.options.apiAuth}/api/user/me`;
  private _menusApi = `${this.options.apiAuth}/api/my-menus`;
  private _loading = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
    private nbMenuService: NbMenuService,
    private router: Router,
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

  get usersimular(): any {
    return this._usersimular;
  }
  set usersimular(value: any) {
    this._usersimular = value;
  }
  get user(): any {
    return this._user;
  }

  set user(value: any) {
    this._user = value;
  }
  get configurations(): any {
    return this._configurations;
  }

  set configurations(value: any) {
    this._configurations = value;
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
  get area(): any {
    return this._area;
  }

  set area(value: any) {
    this._area = value;
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
              this._area = data.data.area;
              this._configurations = data.data.configurations;
              this._usersimular = data.data.user_simular;
              this.getMenus(data.data.user.person.role_id);
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
  getMenus(role_id:any) {
    this.httpClient.get(`${this._menusApi + '/' + role_id}`).subscribe((res:any) => {
      const arrayMenu = res.data || [];
      if (res.success) {
        this.nbMenuService.addItems(arrayMenu ? arrayMenu : [], 'core-menu');
        // console.log(arrayMenu);

        // if (arrayMenu.length>0) {
        //     this.sessionArrayMenu(arrayMenu);
        // }
      }
    });
  }

  // sessionArrayMenu(arrayMenu:any){
  //   const array:any = [];
  //   arrayMenu.map((res:any) => {
  //     res.nivel = 1;
  //     if (!res.children) {
  //       const atributo = {
  //         link: res.link,
  //         nivel: res.nivel,
  //       }
  //       array.push(atributo);
  //     }
  //     if (res && res.children && res.children.length>0) {
  //       res.children.map((a:any) => {
  //           a.nivel = 2;
  //           const atrib = {
  //             link: a.link,
  //             nivel: a.nivel,
  //           }
  //           array.push(atrib);
  //       });
  //     }
  //   });
  //   console.log(array, 'Menussss', this.validUrlRouter(this.router.url, array));
  // }
  // validUrlRouter(url:any, array:any) {
  //   const newStr = url.slice(1);
  //   const valUrl = newStr.split('/') || [];
  //   const u = '/' + valUrl[0] + '/' + valUrl[1];
  //   let obteNivel = array.filter((r:any) => r.link === u);
  //   const nivel = obteNivel.length>0 ? obteNivel[0] : '';
  //   let valid = nivel ? true : false;
  //   let newUrl:any = '';
  //   switch (valid) {
  //     case (nivel.nivel === 1):
  //       const ab  = '/' + valUrl[0] + '/' + valUrl[1];
  //       const buscar = array.find((r:any) => r.link === ab);
  //       newUrl = buscar ? buscar.link : '';
  //       break;
  //     case (nivel.nivel === 2):
  //       const de  = '/' + valUrl[0] + '/' + valUrl[1];
  //       const buscar2 = array.find((r:any) => r.link === de);
  //       newUrl = buscar2 ? buscar2.link : '';
  //       break;
  //     default:
  //       break;
  //     }
  //     return newUrl;
  //   // console.log(url, valUrl, newUrl);
  // }
  start = (): void => this._loading.next(true);
  stop = (): void => this._loading.next(false);

  onLoader = (): Observable<boolean> => this._loading.asObservable();
}
