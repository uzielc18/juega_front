import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { GeneralService } from '../../../providers';
import { END_POINTS } from '../../../providers/utils';

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
  @Output() loadingsMenu: EventEmitter<boolean> = new EventEmitter();
  @Input() cod: any;
  constructor(private menuElements: GeneralService) {}

  ngOnInit(): void {
    this.getElements();
  }

  getElements() {
    const serviceName = 'typeElements';
    this.loadingsMenu.emit(true);
    this.menuElements.nameAll$(serviceName).subscribe(({ data: elements }) => {
      this.elements = elements || [];
      if(this.cod === 'cod'){
        this.elements = this.elements.filter((f: any) => {
          return f.codigo !== 'EVAL'
        })
      }
      if (this.elements.length>0) {
          this.selectedElement(this.elements[0]);
      }
    }, () => { this.loadingsMenu.emit(false); }, () => { this.loadingsMenu.emit(false); });
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
      'border-left': `4px solid ${element.color_hover}`,
      color: element.background,
    };
  }

  selectedElement(element: any) {
    this.onSelect.emit(element);
  }
}
