import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-menu-unit-topic-element',
  templateUrl: './menu-unit-topic-element.component.html',
  styleUrls: ['./menu-unit-topic-element.component.scss']
})
export class MenuUnitTopicElementComponent implements OnInit {
  @Input() elemtent:any;
  loading:boolean = false;
  arrary:any = [
    {
      id: 5,
      nombre: 'ASPECTOS PRELIMINARES DEL APRENDIZAJE',
      checked: false,
      topics: [
        {
          id: 37,
          nombre: 'Rúbrica - ',
          checked: false,
        },
        {
          id: 38,
          nombre: 'Rúbrica - A',
          checked: false,
        },
        {
          id: 35,
          nombre: 'Rúbrica - B',
          checked: false,
        },
        {
          id: 36,
          nombre: 'Rúbrica - C',
          checked: false,
        },
        {
          id: 33,
          nombre: 'Rúbrica - D',
          checked: false,
        },
        {
          id: 34,
          nombre: 'Rúbrica - E',
          checked: false,
        },
      ]
    },
    {
      id: 6,
      nombre: 'PERSPECTIVAS CONDUCTUALES DEL APRENDIZAJE',
      checked: false,
      topics: [
        {
          id: 40,
          nombre: 'Topics d1',
          checked: false,
        },
      ]
    }
  ]
  unitsAndTopics:any = [];
  arrElemt:any = [];
  constructor(private generalServi: GeneralService) { }

  ngOnInit(): void {
    this.unitsAndTopics = JSON.parse(JSON.stringify(this.arrary));
  }
  // Unidades
  selectedUnit(item:any) {
    this.recorreUnit();
    item.checked = true;
    this.unitsAndTopics = this.unitsAndTopics.filter((r:any) => r.id === item.id);
  }
  recorreUnit() {
    this.arrary.map((r:any) => {
      r.checked = false;
    })
  }
  backUnits($event:any, item:any) {
    $event.stopPropagation();
    this.arrElemt = [];
    this.unitsAndTopics = JSON.parse(JSON.stringify(this.arrary));
    this.recorreUnit();
  }
  /// Topics
  selectTopic(topi:any, unit:any) {
    this.arrElemt = [];
    const array =  JSON.parse(JSON.stringify(this.arrary));
    const topis = (array.find((r:any) => r.id === unit.id)).topics;
    unit.topics = topis.filter((rs:any) => rs.id === topi.id);
    this.recorreTopic(topi, unit.topics, 'SELECT');
    this.listElementOrden(topi.id);
  }
  recorreTopic(topi:any, topis:any, type:any) {
    if (topis.length>0) {
      topis.map((r:any) => {
        r.checked = false;
        if ((topi.id === r.id) && type === 'SELECT') {
          r.checked = true;
        }
      });
    }
  }
  backTopics($event:any, topi:any, units:any) {
    $event.stopPropagation();
    this.arrElemt = [];
    const array =  JSON.parse(JSON.stringify(this.arrary));
    units.topics = (array.find((r:any) => r.id === units.id)).topics;
    this.recorreTopic(topi, units.topics, 'CANCEL');
  }
  // Elements
  listElementOrden(topic: any) {
    const serviceName = END_POINTS.base_back.resourse + '/list-elements-order';
    const topic_id = topic;
    this.loading = true;
    this.generalServi.nameId$(serviceName, topic_id).subscribe(
      data => {
        this.arrElemt = data.data || [];
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
}
