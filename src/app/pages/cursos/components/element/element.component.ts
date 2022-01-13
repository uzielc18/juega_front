import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeneralService } from '../../../../providers';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
})
export class ElementComponent implements OnInit {
  @Input() element: any = [];

  clickedIndex: number = 0;
  hoveredIndex: any;

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    // console.log('elementos ------', this.element);
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

  // selectedElement(element: any) {
  //   this.onSelect.emit(element.type_element);
  //   console.log('selected---------', element.type_element);
  // }

  selectedElement(element: any) {
    this.cursosService.emitElement(element);
  }
}
