import { KeyValuePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { HomeworkFormComponent } from '../homework-form/homework-form.component';
import { AdminGroupsComponent } from '../modals/admin-groups/admin-groups.component';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss'],
})
export class SesionComponent implements OnInit {
  @Input() sesion: any = [];
  @Input() unidad: any;
  @Input() curso: any;
  uniqueElements: any
  constructor(private dialogService: NbDialogService) {}

  ngOnInit(): void {
    console.log('coursessss', this.sesion);
    this.groupBy();
  }

  open() {
    this.dialogService.open(HomeworkFormComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        topics: this.sesion,
        unidad: this.unidad,
        curso: this.curso,
        code: 'NEW',
        item: '',
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result.value_close === 'ok') {
        if (result.response && result.response.id && result.value.grupal === '1') {
          console.log(result, 'que tenemos');
          // this.openGroups(result.response);
          // const response = {
          //   id: 12, // id del elemento.
          //   course_id: this.curso.id,
          // }
          // this.openGroups(response);
      }
    }
    });
  }

  groupBy() {
    this.uniqueElements = this.sesion.elements.reduce((r: any, a: any) => {
      r[a.type_element_id] = [...(r[a.type_element_id] || []), a];
      return r;
    }, {});
    // console.log('elementos unicos', this.uniqueElements);
  }
  openGroups(response:any) {
    this.dialogService.open(AdminGroupsComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        curso: this.curso,
        response: response,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        // this.filtrar();
      }
    });
  }
}
