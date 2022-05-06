import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-calendar-home',
  templateUrl: './my-calendar-home.component.html',
  styleUrls: ['./my-calendar-home.component.scss']
})
export class MyCalendarHomeComponent implements OnInit {
  loading: boolean = false;
  date = new Date();
  constructor() { }

  ngOnInit(): void {
  }
  handleDateChange($event:any) {
    console.log($event);
    
  }
}
