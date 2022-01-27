import { Injectable} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitEventsService {
  valuesRolSem$ = new Subject<any>();

  public  rolSemester = new BehaviorSubject<any>({});
  castRolSemester = this.rolSemester.asObservable();

  blockRolSem$ = new Subject<any>();

  constructor() {
  }
  asingDatos(newUser:any){
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

}
