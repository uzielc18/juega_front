import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitEventsService {
  public valuesRolSem$ = new EventEmitter<any>();
  public  rolSemester = new BehaviorSubject<any>({});
  castRolSemester = this.rolSemester.asObservable();

  public emitRoleSource$ = new Subject<any>();

  constructor() {

  }
  roleEmitted$ = this.emitRoleSource$.asObservable();
  emitRol(rol: any) {
    this.emitRoleSource$.next(rol);
  }

  asingDatos(newUser:any){
    this.rolSemester.next(newUser);
  }


}
