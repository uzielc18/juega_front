import {Injectable} from '@angular/core';
import {NbAuthTokenParceler, NbTokenLocalStorage} from "@nebular/auth";

@Injectable()
export class AuthStorageTokenService extends NbTokenLocalStorage {

  constructor(
    parceler: NbAuthTokenParceler,) {
    super(parceler);
    this.key = '__lamb_learning_token';
  }
}
