import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CORE_OPTIONS, CoreOptions } from '../core.options';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AppValidateTokenService {
  constructor(
    protected httpClient: HttpClient,
    @Inject(CORE_OPTIONS) protected options: CoreOptions,
    @Inject(DOCUMENT) protected document: any
  ) {}

  // validateLamb(access_token: any): Observable<any> {
  //   // console.log("servicio", token)
  //   return this.httpClient
  //     .post<any>(`${this.options.apiAuth}/api/loginLamb`, { access_token })
  //     .pipe(
  //       tap(({ data: { token } }) => {
  //         JSON.stringify(localStorage.setItem('token', token));
  //         // console.log("gaaaaaaaaaaaaa", token)
  //       })
  //     );
  // }

  validateLamb(access_token: any): Observable<any> {
    return this.httpClient.post<any>(`${this.options.apiAuth}/api/loginLamb`, {
      access_token,
    });
  }

  validateGoogle(token: any): Promise<any> {
    return this.httpClient
      .post(`${this.options.apiAuth}/api/loginGoogle`, { token })
      .toPromise();
  }

  // Change
  // validate(token: any): Promise<any> {
  // return this.httpClient.post(`${this.options.apiAuth}/api/oauth/valid-tokens-oauth`, {token}).toPromise();
  // }

  authorize(): void {
    const paramRequest = AppValidateTokenService.params();
    const next = 'next=/oauth/authorize/';
    const encodeParamRequest = encodeURIComponent(`${paramRequest}`);
    this.document.location.href = `${environment.authStrategy.baseEndpoint}/accounts/logout?${next}${encodeParamRequest}`;
  }

  //   authorizeLamb(): void {
  //     const paramRequest = AppValidateTokenService.paramsLamb();
  //     const next = 'next=/oauth/authorize/';
  //     const encodeParamRequest = encodeURIComponent(`${paramRequest}`);
  //     this.document.location.href = `${environment.authStrategy.baseEndpoint}/accounts/logout?${next}${encodeParamRequest}`;
  //   }

  //   authorizeGoogle(): void {
  //     const paramRequest = AppValidateTokenService.paramsGoogle();
  //     const next = 'next=/oauth/authorize/';
  //     const encodeParamRequest = encodeURIComponent(`${paramRequest}`);
  //     this.document.location.href = `${environment.authGoogleStrategy.endpoint}/accounts/logout?${next}${encodeParamRequest}`;
  //   }

  private static params(): string {
    const redirectUri = encodeURIComponent(
      environment.authStrategy.redirectUri
    );
    const scope = 'read introspection';
    return `?response_type=token&client_id=${environment.authStrategy.clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
  }

  //   private static paramsLamb(): string {
  //     const redirectUri = encodeURIComponent(
  //       environment.authStrategy.redirectUri
  //     );
  //     const scope = 'read introspection';
  //     return `?response_type=token&client_id=${environment.authStrategy.clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
  //   }

  //   private static paramsGoogle(): string {
  //     const redirectUri = encodeURIComponent(
  //       environment.authStrategy.redirectUri
  //     );
  //     const scope = 'read introspection';
  //     return `?response_type=token&client_id=${environment.authStrategy.clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
  //   }
}
