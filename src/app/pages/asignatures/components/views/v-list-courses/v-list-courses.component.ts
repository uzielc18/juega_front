import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-list-courses',
  templateUrl: './v-list-courses.component.html',
  styleUrls: ['./v-list-courses.component.scss']
})
export class VListCoursesComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

  }

  enterZoom(event: any) {
    event.stopPropagation();
    console.log('entrando a zoom');
  }
}
