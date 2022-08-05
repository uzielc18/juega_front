import { Component } from '@angular/core';
import {Router} from "@angular/router";

//declare const gtag: Function;
@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'core';
  constructor(public router: Router) {

  }
}
