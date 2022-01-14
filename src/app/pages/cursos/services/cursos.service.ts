import { EventEmitter, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CORE_OPTIONS, CoreOptions } from '../../../core/core.options';
import { Observable, Subject } from 'rxjs';
import { Cursos } from '../interfaces/cursos.interface';
import { tap, throwIfEmpty } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private _base_url = `${this.options.apiAuth}/api`;

  public elementSelected$!: EventEmitter<any>;

  private emitRoleSource = new Subject<any>();
  // private emitElementSource = new Subject<any>();

  data$ = new EventEmitter<any>();

  constructor(
    private httpClient: HttpClient,
    @Inject(CORE_OPTIONS) protected options: CoreOptions
  ) {
    this.elementSelected$ = new EventEmitter();
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

  roleEmitted$ = this.emitRoleSource.asObservable();
  // elementEmitted$ = this.emitElementSource.asObservable();

  emitRol(rol: any) {
    this.emitRoleSource.next(rol);
  }

  selElement(element: any): void {
    this.elementSelected$.emit(element);
  }

  // emitElement(element: any) {
  //   this.emitElementSource.next(element);
  // }
}
