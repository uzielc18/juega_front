import {Injectable, NgZone} from '@angular/core';
import {Observable} from "rxjs";
import {END_POINTS} from "./utils";
import {HttpBackend, HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SseService {

  constructor(private _zone: NgZone,
              protected httpClient: HttpClient,
              private handler: HttpBackend) {

  }
}
