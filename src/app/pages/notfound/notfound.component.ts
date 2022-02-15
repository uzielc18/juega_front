import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-notfound',
  template: '<router-outlet></router-outlet>',
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
