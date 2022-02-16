import {Inject, Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {CORE_OPTIONS, CoreOptions} from '../core.options';
import {DOCUMENT} from '@angular/common';
import {environment} from 'src/environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AppService} from "./app.service";

@Injectable()
export class AppValidateTokenService {

  private httpClientForLogout: HttpClient;

  constructor(
    private appService: AppService,
    private handler: HttpBackend,
    protected httpClient: HttpClient,
    @Inject(CORE_OPTIONS) protected options: CoreOptions,
    @Inject(DOCUMENT) protected document: any
  ) {
    this.httpClientForLogout = new HttpClient(handler);
  }

  validateLamb(access_token: any): Observable<any> {
    return this.httpClient.post<any>(`${this.options.apiAuth}/api/loginLamb`, {
      access_token,
    });
  }

  validateGoogle(access_token: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.options.apiAuth}/api/loginGoogle`,
      {
        access_token,
      }
    );
  }

  logout() {
    return this.httpClient.get(`${environment.apiUrls.auth}/api/logout`);
  }


  logoutLamb() {
    const token = this.appService.user.hasOwnProperty('access_token') ? this.appService.user.access_token : '';
    return this.httpClientForLogout.post(`${environment.authStrategy.baseEndpoint}/api/logout_all/`, {}, {headers: new HttpHeaders({'Authorization': `Bearer ${token}`})})
  };


  // Change
  // validate(token: any): Promise<any> {
  // return this.httpClient.post(`${this.options.apiAuth}/api/oauth/valid-tokens-oauth`, {token}).toPromise();
  // }

  // authorize(): void {
  //   const paramRequest = AppValidateTokenService.params();
  //   const next = 'next=/oauth/authorize/';
  //   const encodeParamRequest = encodeURIComponent(`${paramRequest}`);
  //   this.document.location.href = `${environment.authStrategy.baseEndpoint}/accounts/logout?${next}${encodeParamRequest}`;
  // }

  authorizeLamb(): void {
    const paramRequest = AppValidateTokenService.paramsLamb();
    const next = 'next=/oauth/authorize/';
    const encodeParamRequest = encodeURIComponent(`${paramRequest}`);
    this.document.location.href = `${environment.authStrategy.baseEndpoint}/accounts/logout?${next}${encodeParamRequest}`;
  }

  authorizeGoogle(): void {
    const paramRequest = AppValidateTokenService.paramsGoogle();
    const next = 'next=/oauth/authorize/';
    const encodeParamRequest = encodeURIComponent(`${paramRequest}`);
    this.document.location.href = `${environment.authGoogleStrategy.endpoint}/accounts/logout?${next}${encodeParamRequest}`;
  }

  // authorize(): void {
  //   const next = 'next=' +  '/oauth/authorize/';
  //   this.document.location.href = `${environment.authStrategy.baseEndpoint}/accounts/logout?${next}`;
  //   // window.location.href = environment.shellApp;
  // }
  //   authorize(): void {
  //     const paramRequest = AppValidateTokenService.params();
  //     const next = 'next=/oauth/authorize/';
  //     const encodeParamRequest = encodeURIComponent(`${paramRequest}`);
  //     this.document.location.href = `${environment.authStrategy.baseEndpoint}/accounts/logout?${next}${encodeParamRequest}`;
  // }

  // private static params(): string {
  //     const redirectUri = encodeURIComponent(environment.authStrategy.redirectUri);
  //     const scope = 'read introspection';
  //     return `?response_type=token&client_id=${environment.authStrategy.clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
  // }


  private static paramsLamb(): string {
    const redirectUri = encodeURIComponent(
      environment.authStrategy.redirectUri
    );
    const scope = 'read introspection';
    return `?response_type=token&client_id=${environment.authStrategy.clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
  }

  private static paramsGoogle(): string {
    const redirectUri = encodeURIComponent(
      environment.authGoogleStrategy.redirectUri
    );
    const scope = 'read introspection';
    return `?response_type=token&client_id=${environment.authGoogleStrategy.clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
  }
}
