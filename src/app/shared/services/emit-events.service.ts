import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitEventsService {
  valuesRolSem$ = new EventEmitter<any>();
  private rolSemester = new BehaviorSubject<any>({});
  castRolSemester = this.rolSemester.asObservable();

  constructor() {
  }
  asingDatos(newUser:any){
    this.rolSemester.next(newUser);
  }

}
