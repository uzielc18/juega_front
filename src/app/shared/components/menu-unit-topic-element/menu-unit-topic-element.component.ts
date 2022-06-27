import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-menu-unit-topic-element',
  templateUrl: './menu-unit-topic-element.component.html',
  styleUrls: ['./menu-unit-topic-element.component.scss']
})
export class MenuUnitTopicElementComponent implements OnInit, OnChanges {
  @Input() elemtent:any;
  loading:boolean = false;
  porincUnitsTopics:any = [];
  unitsAndTopics:any = [];
  arrElemt:any = [];
  topic_id:any;
  @Output() elementSelected: EventEmitter<any> = new EventEmitter();
  constructor(private generalServi: GeneralService) { }
  ngOnChanges():void {
    this.elemtent = this.elemtent;
    if (this.elemtent && this.elemtent.id) {
      console.log(this.elemtent);
      this.unitsAndTopics = [];
      const ele = this.elemtent;
      const values = {
        id: ele.topic.unit.id,
        nombre: ele.topic.unit.nombre,
        checked: true,
        topics: [
          {
            id: ele.topic.id,
            tema: ele.topic.tema,
            checked: true,
            modo: ele.topic.modo
          }
        ]
      };
      this.unitsAndTopics.push(values);
      this.topic_id = ele.topic.id;
      if (ele.topic.modo === 'ordenado') {
        this.listElementOrden(ele.topic.id);
      }
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.listUnitTopics(this.elemtent.id_carga_curso_docente);
    }, 3000);
  }
  listUnitTopics(idCargaCursoDocente: any) {
    const serviceName = 'list-units-topics';
    this.generalServi.nameId$(serviceName, idCargaCursoDocente).subscribe(data => {
        this.porincUnitsTopics = data.data || [];
        if (this.porincUnitsTopics.length>0) {
          this.porincUnitsTopics.map((a:any) => {
            a.checked = false;
            if ( a.topics.length >0) {
              a.topics.map((x:any) => {
                x.checked = false;
              })
            }
     
          })
        }
      });
  }
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return '';
    }
  }
  // Unidades
  selectedUnit(item:any) {
    this.unitsAndTopics = JSON.parse(JSON.stringify(this.porincUnitsTopics));
    this.recorreUnit();
    this.unitsAndTopics = this.unitsAndTopics.filter((r:any) => r.id === item.id);
    this.unitsAndTopics.map((abc:any) => {
      if (abc.id === item.id) {
        abc.checked = true;
      }
    })
  }
  recorreUnit() {
    this.porincUnitsTopics.map((r:any) => {
      r.checked = false;
    })
  }
  backUnits($event:any, item:any) {
    $event.stopPropagation();
    this.arrElemt = [];
    this.unitsAndTopics = JSON.parse(JSON.stringify(this.porincUnitsTopics));
    this.recorreUnit();
  }
  /// Topics
  selectTopic(topi:any, unit:any) {
    this.arrElemt = [];
    const array =  JSON.parse(JSON.stringify(this.porincUnitsTopics));
    const topis = (array.find((r:any) => r.id === unit.id)).topics;
    unit.topics = topis.filter((rs:any) => rs.id === topi.id);
    this.recorreTopic(topi, unit.topics, 'SELECT');
    this.topic_id = topi.id; 
    if (topi.modo === 'ordenado') {
      this.listElementOrden(topi.id);
    }
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
    const array =  JSON.parse(JSON.stringify(this.porincUnitsTopics));
    units.topics = (array.find((r:any) => r.id === units.id)).topics;
    this.recorreTopic(topi, units.topics, 'CANCEL');
  }
  // Elements
  listElementOrden(topic: any) {
    const serviceName = END_POINTS.base_back.resourse + '/list-elements-order';
    const topic_id = topic;
    this.loading = true;
    this.generalServi.nameId$(serviceName, topic_id).subscribe(data => {
        this.arrElemt = data.data || [];
        if (this.arrElemt.length>0) {
          this.arrElemt.map((a:any) => {
            a.checked = false;
            if (a.id === this.elemtent.id) {
              a.checked = true;
            }
          })
        }
        console.log(this.arrElemt, 'aaaa');
        
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
  getColorSelected(el:any) {
    if (el.checked) {
      return {'color': el.type_elements.background, 'font_weight': 'bold', 'font-size': '12px'}
    } else {
      return {'font-size': '10px'}
    }
  }
  getClass(el:any, topisc:any) {
    let valar:any = 'nietoHover';
    if (this.rolSemestre?.rol?.name === 'Estudiante' && el?.listo === 1 && topisc?.modo === 'ordenado') {
      valar = 'nietoHover';
    }
    if (this.rolSemestre?.rol?.name === 'Estudiante' && el?.listo === 0 && topisc?.modo === 'ordenado') {
      valar = 'nietoHoverBlock';
    }
    if (this.rolSemestre?.rol?.name === 'Docente') {
      valar = 'nietoHover';
    }
    return valar;
  }
  selectedElmtOrdenado(el:any) {
    // console.log(el);
    this.arrElemt.map((r:any) => {
      r.checked = false;
    });
    el.checked = true;
    this.elementSelected.emit(el);
  }
  selectedElemGroup($event:any) {
    // console.log($event);
    this.elementSelected.emit($event);
  }
}
