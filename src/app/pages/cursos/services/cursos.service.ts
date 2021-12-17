import { Inject, Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { CORE_OPTIONS, CoreOptions } from '../../../core/core.options';
import { Observable } from 'rxjs';
import { Cursos } from '../interfaces/cursos.interface';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private _base_url = `${this.options.apiAuth}/api`;

  constructor(
    private httpClient: HttpClient,
    @Inject(CORE_OPTIONS) protected options: CoreOptions
  ) {}

  getCourses() {
    return this.httpClient.get(`${this._base_url}/resources-person/enrollment-student`);
  }
}
