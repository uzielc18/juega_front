import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmitEventsService {
  valuesRolSem$ = new Subject<any>();

  public rolSemester = new BehaviorSubject<any>({});
  castRolSemester = this.rolSemester.asObservable();

  blockRolSem$ = new Subject<any>();

  setLanguages$ = new Subject<any>();

  profile$ = new Subject<boolean>();

  actMenu$ = new Subject<boolean>();

  valuesEmail$ = new Subject<any>();

  valuesCurso$ = new Subject<any>();

  constructor() {}
  asingDatos(newUser: any) {
    this.rolSemester.next(newUser);
  }

  enviar(value: any) {
    this.valuesRolSem$.next(value);
  }

  returns(): Observable<any> {
    return this.valuesRolSem$.asObservable();
  }

  blockEnviar(value: any) {
    this.blockRolSem$.next(value);
  }

  blockReturns(): Observable<any> {
    return this.blockRolSem$.asObservable();
  }

  setLangsEnviar(value: any) {
    this.setLanguages$.next(value);
  }

  setLangsReturns(): Observable<any> {
    return this.setLanguages$.asObservable();
  }

  profileInfo(value: boolean) {
    // console.log('profileInfo', value);
    this.profile$.next(value);
  }

  profileInfoReturns(): Observable<any> {
    return this.profile$.asObservable();
  }

  reloadMenuEmit(value: boolean) {
    this.actMenu$.next(value);
  }
  reloadMenuResponse(): Observable<any> {
    return this.actMenu$.asObservable();
  }
  enviarEmail(value: any) {
    this.valuesEmail$.next(value);
  }

  returnsEmail(): Observable<any> {
    return this.valuesEmail$.asObservable();
  }
  enviarCurso(value: any) {
    this.valuesCurso$.next(value);
  }

  returnsCurso(): Observable<any> {
    return this.valuesCurso$.asObservable();
  }
}
