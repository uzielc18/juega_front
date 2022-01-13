import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityDataService, IResponse, END_POINTS } from '../providers/utils';

@Injectable()
export class GeneralService extends EntityDataService<IResponse> {
    constructor(protected httpClient: HttpClient) {
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

    public deleteNameId$(serviceName: any, id: any): Observable<IResponse> {
        return this.httpClient.delete<IResponse>(`${this.endPoint}/${serviceName}/${id}`);
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
}
