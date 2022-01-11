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
    // console.log('elements', this.sesion.elements);
    this.groupBy();
  }

  open() {
<<<<<<< HEAD
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
      // this.openGroups();
      }
    });
=======
    this.dialogService
      .open(HomeworkFormComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          topics: this.sesion,
          unidad: this.unidad,
          curso: this.curso,
          code: 'NEW',
          item: '',
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe((result) => {
        if (result == 'ok') {
          // this.filtrar();
        }
      });
  }

  groupBy() {
    this.uniqueElements = this.sesion.elements.reduce((r: any, a: any) => {
      r[a.type_element_id] = [...(r[a.type_element_id] || []), a];
      return r;
    }, {});
    // console.log('elementos unicos', this.uniqueElements);
>>>>>>> 829d8e423f166de48d83e2de42e7297b96a44ac8
  }
  // openGroups() {
  //   this.dialogService.open(AdminGroupsComponent, {
  //     dialogClass: 'dialog-limited-height',
  //     context: {
  //       curso: this.curso,
  //     },
  //     closeOnBackdropClick: false,
  //     closeOnEsc: false
  //   }).onClose.subscribe(result => {
  //     if (result === 'ok') {
  //       // this.filtrar();
  //     }
  //   });
  // }
}
