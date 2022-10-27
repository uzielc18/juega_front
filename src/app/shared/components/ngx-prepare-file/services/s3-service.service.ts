import {Inject, Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpBackend, HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {CORE_OPTIONS, CoreOptions} from "../../../../core/core.options";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class S3ServiceService {
  private _base_url = `${environment.apiUrls.base}/api`;
  httpHandler: any = HttpClient;
  constructor(
    private httpClient: HttpClient,
    private handler: HttpBackend,
    @Inject(CORE_OPTIONS) protected options: CoreOptions
  ) {}

  addFimadoS3$(data: any): Observable<any> {
    return this.httpClient.get<any>(`${this._base_url}/resources-person/files-upload/get-signed-url`, {params: data});
  }
  addS3$(url: any, contenttype:any, fileFormData:any): Observable<any> {
    const http = new HttpClient(this.handler);
    const headers = new HttpHeaders(
      {
        'Content-Type': contenttype,
        'Accept': '*/*',
        // 'Content-Type': 'multipart/form-data',

      });
    const req = new HttpRequest('PUT', url, fileFormData,
      {
        headers: headers,
        reportProgress: true,
        responseType: 'json'
      });
    return http.request(req);
  }
  getUserMe(): Observable<any> {
    return this.httpClient.get<any>(`${this._base_url}/user/me`);
  }

}
