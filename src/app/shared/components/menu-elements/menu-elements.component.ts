import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GeneralService } from '../../../providers';

@Component({
  selector: 'app-menu-elements',
  templateUrl: './menu-elements.component.html',
  styleUrls: ['./menu-elements.component.scss'],
})
export class MenuElementsComponent implements OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  elements: any[] = [];
  clickedIndex: number = 0;
  hoveredIndex: any;

  constructor(private menuElements: GeneralService) {}

  ngOnInit(): void {
    this.getElements();
  }

  getElements() {
    this.menuElements
      .nameAll$('typeElements')
      .subscribe(({ data: elements }) => {
        console.log('elements', elements);
        this.elements = elements;
      });
  }

  elementStyle() {
    return {
      'background-color': '#f5f5f5',
      'border-left': '4px solid transparent',
      color: '#4E4E4D',
    };
  }

  elementStyleActive(element: any) {
    return {
      'background-color': element.background,
      'border-left': '4px solid transparent',
      color: element.color_active,
    };
  }

  elementStyleHover(element: any) {
    return {
      'background-color': '#f5f5f5',
      'border-left': `4px solid ${element.color_hover}`,
      color: `${element.background} !important`,
    };
  }

  elementIcon(element: any) {
    return element.icono;
  }

  selectedElement(element: any) {
    this.onSelect.emit(element.nombre);
    console.log('elemento seleccionado', element.nombre);
  }
}
