import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from '../../../../providers';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
})
export class ElementComponent implements OnInit {
  @Input() element: any = [];

  clickedIndex: number = 0;
  hoveredIndex: any;

  constructor() {}

  ngOnInit(): void {
    console.log('elementos ------', this.element);
  }

  elementStyleActive(element: any) {
    return {
      'background-color': element.background,
      color: element.color_active,
    };
  }

  elementStyleHover(element: any) {
    return {
      'background-color': element.background,
      color: element.color_active,
    };
  }
}
