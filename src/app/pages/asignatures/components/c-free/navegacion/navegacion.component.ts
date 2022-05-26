import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../../../../../core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss'],
})
export class NavegacionComponent implements OnInit {
  @Input() curso: any;
  userInfo: any;
  showText: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private userService: AppService) {
    this.breakpointObserver.observe(['(max-width: 1399px)']).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.showText = true;
      } else {
        this.showText = false;
      }
    });
  }

  ngOnInit(): void {
    this.userInfo = this.userService;
  }
}
