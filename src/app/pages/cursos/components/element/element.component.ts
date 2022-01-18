import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeneralService } from '../../../../providers';
import { END_POINTS } from '../../../../providers/utils';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
})
export class ElementComponent implements OnInit {
  @Input() element: any = [];
  listElem: any;
  ele: any;
  loading: boolean = false;
  showList: any = false;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();
  @Output() arrayElement: EventEmitter<any> = new EventEmitter();

  clickedIndex: any = true;
  hoveredIndex: any;

  constructor(private generalService: GeneralService) {}

  ngOnInit(): void {
    this.addCheck();
  }

  elementStyle() {
    return {
      color: '#898989',
    };
  }

  elementStyleActive(element: any) {
    return {
      color: element.color_hover,
    };
  }

  elementStyleHover(element: any) {
    return {
      color: element.color_hover,
    };
  }

  listElements(topic: any, type: any) {
    const serviceName = END_POINTS.base_back.resourse + '/list-elements';
    const topic_id = topic;
    const type_element_id = type;
    this.loadingsForm.emit(true);

    this.generalService.nameIdAndId$(serviceName, topic_id, type_element_id).subscribe(
        (data) => {
          this.listElem = data.data || [];
          // this.cursosService.selElement(this.listElem);
          this.arrayElement.emit(this.listElem);
        },
        () => {
          this.loadingsForm.emit(false);
        },
        () => {
          this.loadingsForm.emit(false);
        }
      );
  }

  selectedElement(element: any) {
    this.revisarCheck(element);
  }

  addCheck() {
    if (this.element.length>0) {
      this.element.map((el: any) => {
       el.check = false;
     });
    }
  }

  revisarCheck(element: any) {

    if(!element.check) {
      this.addCheck();
      element.check = true;
      this.listElements(element.topic_id, element.type_element_id);
      this.arrayElement.emit(this.listElem);
    } else {
      element.check = false;
      this.listElem = [];
      this.arrayElement.emit(this.listElem);
    }
    // if (element.check) {
    //   element.check = false;
    //   this.listElem = [];
    //   this.arrayElement.emit(this.listElem);
    // } else {
    //   element.check = true;
    //   this.listElements(element.topic_id, element.type_element_id);
    // }
  }
}
