import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menus',
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class MenusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
