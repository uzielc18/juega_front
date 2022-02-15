import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exam-home',
  templateUrl: './exam-home.component.html',
  styleUrls: ['./exam-home.component.scss']
})
export class ExamHomeComponent implements OnInit {
  collapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  collapse() {
    this.collapsed = !this.collapsed;
  }

}
