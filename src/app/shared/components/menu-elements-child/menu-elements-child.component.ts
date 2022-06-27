import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-menu-elements-child',
  templateUrl: './menu-elements-child.component.html',
  styleUrls: ['./menu-elements-child.component.scss']
})
export class MenuElementsChildComponent implements OnInit, OnChanges {
  @Input() element:any;
  @Input() topic_id:any;
  @Output() elementSelectedGru: EventEmitter<any> = new EventEmitter();
  loading:boolean = false;
  listElemtChild: any = [];
  clickedIndex: number = 0;
  hoveredIndex: any;

  @ViewChild('stickyMenu') menuElement!: ElementRef;

  // sticky: boolean = false;
  // elementPosition: any;
  // ngAfterViewInit(){
  //   this.elementPosition = this.menuElement.nativeElement.offsetTop;
  // }

  // @HostListener('window:scroll', ['$event'])
  //   handleScroll(){
  //     const windowScroll = window.pageYOffset;
  //     if(windowScroll >= this.elementPosition){
  //       this.sticky = true;
  //     } else {
  //       this.sticky = false;
  //     }
  //   }

  constructor(private generalServi: GeneralService) { }
  ngOnChanges():void {
    if (this.topic_id) {
      console.log(this.topic_id, 'soy agrupado');
      this.getElementChild();
    }
  }
  ngOnInit(): void {

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
      if (Number(this.element.type_element_id) === Number(r.id)) {
        r.checked = true;
        if (r.elements.length>0) {
          r.elements.map((a:any) => {
            a.color = '';
            a.font_weight = '';
            a.font_size = '';
            if (Number(this.element.id) === Number(a.id)) {
              a.color = r.background;
              a.font_weight = 'bold';
              a.font_size = '14px';
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
              a.font_size = '14px';
            }
          });
        }
      });
      this.elementSelectedGru.emit(item);
    }
  }
}
