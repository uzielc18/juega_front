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
  loading: boolean = false;

  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();
  @Output() arrayElement: EventEmitter<any> = new EventEmitter();

  clickedIndex: number = 0;
  hoveredIndex: any;

  constructor(
    private cursosService: CursosService,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {}

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
  //   this.cursosService.emitElement(element);
  //   console.log(element)
  // }

  listElements(topic: any, type: any) {
    const serviceName = END_POINTS.base_back.resourse + '/list-elements';
    const topic_id = topic;
    const type_element_id = type;
    this.loadingsForm.emit(true);

    this.generalService.nameIdAndId$(serviceName, topic_id, type_element_id).subscribe(
        (data) => {
          const listElem = data.data || [];
          // this.cursosService.selElement(this.listElem);
          this.arrayElement.emit(listElem);
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
    console.log('elelelelelelel', element);
    this.listElements(element.topic_id, element.type_element_id);
    // this.listElements(37, 1);
  }
}
