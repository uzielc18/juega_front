import { EventEmitter, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CORE_OPTIONS, CoreOptions } from '../../../core/core.options';
import { Observable } from 'rxjs';
import { Cursos } from '../interfaces/cursos.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private _base_url = `${this.options.apiAuth}/api`;

  data$ = new EventEmitter<any>();

  constructor(
    private httpClient: HttpClient,
    @Inject(CORE_OPTIONS) protected options: CoreOptions
  ) {}

  getSemestres(): Observable<any> {
    return this.httpClient.get<any>(`${this._base_url}/user/mysemesters`);
  }

  updateSemestre(semesterId: number): Observable<any> {
    return this.httpClient.get<any>(
      `${this._base_url}/user/updatesemester/${semesterId}`
    )
  }

  getCursos(): Observable<Cursos[]> {
    return this.httpClient
      .get<Cursos[]>(`${this._base_url}/resources-person/enrollment-student`)
      .pipe(
        tap((resp) => {
          this.data$.emit(resp);
        })
      );
  }

  getUnidades(courseId: number): Observable<any> {
    return this.httpClient.get<any>(
      `${this._base_url}/resources-person/elements-course/${courseId}`
    );
  }
}
