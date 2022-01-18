import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CoreOptions, CORE_OPTIONS } from 'src/app/core/core.options';
import { Cursos } from '../interfaces/courses.interface';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
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
        tap((resp:any) => {
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
