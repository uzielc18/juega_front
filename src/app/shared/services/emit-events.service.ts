import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitEventsService {
  valuesRolSem$ = new EventEmitter<any>();
  constructor() {
  }
}
