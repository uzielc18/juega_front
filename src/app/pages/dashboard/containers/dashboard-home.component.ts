import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  collapseLeft: boolean = false;
  collapseTop: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  tweakCollapseLeft() {
    this.collapseLeft = !this.collapseLeft;
  }

  tweakCollapseTop() {
    this.collapseTop = !this.collapseTop;
  }

  marginNegative() {
    return {
      'margin-top': '-10px'
    }
  }

  normalMargin() {
    return {
      'margin-top': '0'
    }
  }

}
