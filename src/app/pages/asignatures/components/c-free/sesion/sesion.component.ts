import { KeyValuePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { AdminGroupsComponent } from '../../modals/admin-groups/admin-groups.component';
import { HomeworkFormComponent } from '../../modals/homework-form/homework-form.component';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss'],
})
export class SesionComponent implements OnInit {
  @Input() sesion: any = [];
  @Input() unidad: any;
  @Input() curso: any;

  arrayEl: any = [];
  loading: boolean = false;

  clickedIndex: any = true;
  hoveredIndex: any;
  constructor(private dialogService: NbDialogService, private generalService: GeneralService) {}

  ngOnInit(): void {
  }
  newElemnts() {
    const params = {
      code: 'NEW',
      item: '',
    }
    this.open(params);
  }
  updateElements(el:any) {
    const params = {
      code: 'UPDATE',
      item: el,
    }
    this.open(params);
  }

  open(params:any) {
    this.dialogService.open(HomeworkFormComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        topics: this.sesion,
        unidad: this.unidad,
        curso: this.curso,
        code: params.code,
        item: params.item,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result.value_close === 'ok') {
        if (result.response && result.response.id && result.value.grupal === '1') {
          // console.log(result, 'que tenemos');
          // this.openGroups(result.response);
          const params = {
            id: result.response.id, // id del elemento.
            course_id: this.curso.id,
          }
          this.openGroups(params);
      }
    }
    });
  }
  adminGrupal(el:any) {
    const params = {
      id: el.id, // id del elemento.
      course_id: this.curso.id,
    }
    if (params && params.id && params.course_id) {
      this.openGroups(params);
    }
  }

  openGroups(params:any) {
    this.dialogService.open(AdminGroupsComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        curso: this.curso,
        response: params,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        // this.filtrar();
      }
    });
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

  selectedElement(element: any) {
    this.revisarCheck(element);
  }

  addCheck() {
    if (this.sesion.elements.length>0) {
      this.sesion.elements.map((el: any) => {
       el.check = false;
     });
    }
  }

  revisarCheck(element: any) {
    if(!element.check) {
      this.addCheck();
      element.check = true;
      this.listElements(element.topic_id, element.type_element_id);
      // this.arrayElement.emit(this.listElem);
    } else {
      element.check = false;
      this.arrayEl = [];
      // this.arrayElement.emit(this.listElem);
    }
  }
  listElements(topic: any, type: any) {
    const serviceName = END_POINTS.base_back.resourse + '/list-elements';
    const topic_id = topic;
    const type_element_id = type;
    this.loading = true;

    this.generalService.nameIdAndId$(serviceName, topic_id, type_element_id).subscribe(
        (data) => {
          this.arrayEl = data.data || [];
          // this.cursosService.selElement(this.listElem);
          // this.arrayElement.emit(this.arrayEl);
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
