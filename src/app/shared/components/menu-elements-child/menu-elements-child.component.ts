import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-menu-elements-child',
  templateUrl: './menu-elements-child.component.html',
  styleUrls: ['./menu-elements-child.component.scss']
})
export class MenuElementsChildComponent implements OnInit {
  @Input() topic_id:any;
  @Input() type_element_id:any;
  @Input() id_element:any;
  @Output() elementSelected: EventEmitter<boolean> = new EventEmitter();
  loading:boolean = false;
  listElemtChild: any = [];
  clickedIndex: number = 0;
  hoveredIndex: any;
  constructor(private generalServi: GeneralService) { }

  ngOnInit(): void {
    this.getElementChild();
  }
  getElementChild() {
      const serviceName = END_POINTS.base_back.resourse + '/topic-element-by-categories';
      if (this.topic_id) {
        this.loading = true;
        this.generalServi.nameId$(serviceName, this.topic_id).subscribe(r => {
          this.listElemtChild = r.data || [];
          if (this.listElemtChild.length>0) {
            this.searchInArray();
          }
        }, () => { this.loading = false; }, () => { this.loading = false; });
      }
  }
  searchInArray() {
    this.listElemtChild.map((r:any) => {
      r.checked = false;
      if (Number(this.type_element_id) === Number(r.id)) {
        r.checked = true;
        if (r.elements.length>0) {
          r.elements.map((a:any) => {
            a.color = '';
            a.font_weight = '';
            a.font_size = '';
            if (Number(this.id_element) === Number(a.id)) {
              a.color = r.background;
              a.font_weight = 'bold';
              a.font_size = '15px';
            }
          });
        }
      }
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
      'border-left': `4px solid ${element.color_hover}`,
      color: element.background,
    };
  }

  recorrerLisElChild(typeEle:any) {
    if (this.listElemtChild.length>0) {
      this.listElemtChild.map((r:any) => {
        r.checked = false;
      });
      typeEle.checked = true;
    }
  }
  selectElement(item:any) {
    if (this.listElemtChild.length>0) {
      this.listElemtChild.map((r:any) => {
        if (r.elements.length>0) {
          r.elements.map((a:any) => {
            a.color = '';
            a.font_weight = '';
            a.font_size = '';
            if (Number(item.id) === Number(a.id)) {
              a.color = r.background;
              a.font_weight = 'bold';
              a.font_size = '15px';
            }
          });
        }
      });
      this.elementSelected.emit(item);
    }
  }
}
