import { HttpBackend, HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import {Observable, timer} from 'rxjs';
import { EntityDataService, IResponse, END_POINTS } from '../providers/utils';
import {environment} from "../../environments/environment";
import { switchMap, debounceTime, catchError } from 'rxjs/operators';

const TIME=30000; //milisegundos
@Injectable()
export class GeneralService extends EntityDataService<IResponse> {
      eventSource: any = window['EventSource'];
    constructor(protected httpClient: HttpClient,
                private _zone: NgZone,
      private handler: HttpBackend) {
        super(httpClient, END_POINTS.patmos_base);
    }

    public nameAll$(serviceName: any): Observable<IResponse> {
        return this.httpClient.get<IResponse>(`${this.endPoint}/${serviceName}`);
    }
    public nameParams$(serviceName: any, params: any): Observable<IResponse> {
        return this.httpClient.get<IResponse>(`${this.endPoint}/${serviceName}`, { params });
    }
    public nameId$(serviceName: any, id: any): Observable<IResponse> {
        return this.httpClient.get<IResponse>(`${this.endPoint}/${serviceName}/${id}`);
    }
    public addNameData$(serviceName: any, data: any): Observable<IResponse> {
        return this.httpClient.post<IResponse>(`${this.endPoint}/${serviceName}`, data);
    }
    public addNameIdData$(serviceName: any, id:any, data: any): Observable<IResponse> {
      return this.httpClient.post<IResponse>(`${this.endPoint}/${serviceName}/${id}`, data);
    }
    public addNameIdAndIdData$(serviceName: any, id:any, id2:any, data: any): Observable<IResponse> {
      return this.httpClient.post<IResponse>(`${this.endPoint}/${serviceName}/${id}/${id2}`, data);
    }
    public addNameIdAndIdAndIdData$(serviceName: any, id:any, id2:any,id3: any, data: any): Observable<IResponse> {
      return this.httpClient.post<IResponse>(`${this.endPoint}/${serviceName}/${id}/${id2}/${id3}`, data);
    }
    public deleteNameParams$(serviceName: any, params:any): Observable<IResponse> {
      return this.httpClient.delete<IResponse>(`${this.endPoint}/${serviceName}`, {params});
  }
    public deleteNameId$(serviceName: any, id: any): Observable<IResponse> {
        return this.httpClient.delete<IResponse>(`${this.endPoint}/${serviceName}/${id}`);
    }
    public deleteNameIdParams$(serviceName: any, id: any, params:any): Observable<IResponse> {
      return this.httpClient.delete<IResponse>(`${this.endPoint}/${serviceName}/${id}`, {params});
  }
    public updateNameIdData$(serviceName: any, id: any, data: any): Observable<IResponse> {
        return this.httpClient.put<IResponse>(`${this.endPoint}/${serviceName}/${id}`, data);
    }
    public updateNameData$(serviceName: any, data: any): Observable<IResponse> {
        return this.httpClient.put<IResponse>(`${this.endPoint}/${serviceName}`, data);
    }
    public updateNameId$(serviceName: any, id: any): Observable<IResponse> {
      return this.httpClient.put<IResponse>(`${this.endPoint}/${serviceName}/${id}`, {});
    }
    public nameIdAndId$(serviceName: any, id: any, id2:any): Observable<IResponse> {
      return this.httpClient.get<IResponse>(`${this.endPoint}/${serviceName}/${id}/${id2}`);
    }
    public nameIdAndIdAndId$(serviceName: any, id: any, id2:any, id3:any): Observable<IResponse> {
      return this.httpClient.get<IResponse>(`${this.endPoint}/${serviceName}/${id}/${id2}/${id3}`);
    }
    public nameIdAndIdAndIdAndId$(serviceName: any, id: any, id2: any, id3: any, id4: any): Observable<IResponse> {
      return this.httpClient.get<IResponse>(`${this.endPoint}/${serviceName}/${id}/${id2}/${id3}/${id4}`);
    }
    public nameIdAndIdParams$(serviceName: any, id: any, id2:any, params:any): Observable<IResponse> {
      return this.httpClient.get<IResponse>(`${this.endPoint}/${serviceName}/${id}/${id2}`, {params});
    }
    public updateNameIdAndIdData$(serviceName: any, id: any, id2: any, data: any): Observable<IResponse> {
      return this.httpClient.put<IResponse>(`${this.endPoint}/${serviceName}/${id}/${id2}`, data);
    }
    public nameIdAndIdAndIdParams$(serviceName: any, id: any, id2:any, id3: any, params:any): Observable<IResponse> {
      return this.httpClient.get<IResponse>(`${this.endPoint}/${serviceName}/${id}/${id2}/${id3}`, {params});
    }
    public nameIdParams$(serviceName: any, id: any, params:any): Observable<IResponse> {
      return this.httpClient.get<IResponse>(`${this.endPoint}/${serviceName}/${id}`, {params});
    }

      getNotification(url: any):Observable<any[]>{
        return this.httpClient.get<any[]>(url);
      }
      pollNotification(url: any): Observable<any[]> {
        return timer(0,TIME).pipe(
          switchMap(() => this.getNotification(`${this.endPoint}/${url}`)));
      }
    public apisExternas$(methos:any, url:any, paramsHeaders?:any): Observable<any> {
      const http = new HttpClient(this.handler);
      const headers = new HttpHeaders(
        {
          // 'Authorization': ''
        });
      const req = new HttpRequest(methos, url,
        {
          headers: headers,
        });
      return http.request(req);
    }
    public apiNewToken$(methos:any, url:any, paramsHeaders?:any): Observable<any> {
      const http = new HttpClient(this.handler);
      const headers = new HttpHeaders(
        {
           'Authorization': 'Bearer ' + paramsHeaders.token,
           'authorizationstrategy': '_lamb_strategy'
        });
      const req = new HttpRequest(methos, url,
        {
          headers: headers,
        });
      return http.request(req);
    }
    getServerSentEvent(url: string): Observable<any> {
      return new Observable<any>(obs => {

        const eventSource = new this.eventSource(environment.apiUrls.base + url);

        eventSource.onmessage = (event: any) => {

          let data = JSON.parse(event.data);

          // $apply external (window.EventSource) event data
          this._zone.run(() => obs.next(data));

        };
        // close connection when observer unsubscribe
        return () => eventSource.close();
      });
    }
}
