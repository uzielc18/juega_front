import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { AdminGroupsComponent } from '../../modals/admin-groups/admin-groups.component';
import { HomeworkFormComponent } from '../../modals/homework-form/homework-form.component';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsConfigComponent } from '../../modals/questions-config/questions-config.component';
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
  @Output() validaExist = new EventEmitter<any>();
  constructor(
    private dialogService: NbDialogService,
    private generalService: GeneralService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return '';
    }
  }
  newElemnts() {
    const params = {
      code: 'NEW',
      item: '',
    };
    this.open(params);
  }
  updateElements(el: any) {
    const params = {
      code: 'UPDATE',
      item: el,
    };
    this.open(params);
  }

  open(params: any) {
    this.dialogService
      .open(HomeworkFormComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          topics: this.sesion,
          unidad: this.unidad,
          curso: this.curso,
          code: params.code,
          item: params.item,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        if (result.value_close === 'ok') {
          // console.log(result.response);
          let valid = false;
          if (this.sesion.elements.length > 0) {
            valid = this.sesion.elements.find((r: any) => (r.type_element_id === result.response.type_element_id ? true : false));
            if (valid) {
              this.setCheck(result.response.type_element_id);
              this.listElements(result.response.topic_id, result.response.type_element_id);
            } else {
              this.arrayEl = [];
              this.validaExist.emit();
            }
          }

          if (result.response && result.response.id && result.value.grupal === '1') {
            // console.log(result, 'que tenemos');
            // this.openGroups(result.response);
            const params = {
              id: result.response.id, // id del elemento.
              course_id: this.curso.id,
            };
            this.openGroups(params);
          }
        }
      });
  }
  adminGrupal(el: any) {
    const params = {
      id: el.id, // id del elemento.
      course_id: this.curso.id,
    };
    if (params && params.id && params.course_id) {
      this.openGroups(params);
    }
  }

  openGroups(params: any) {
    this.dialogService
      .open(AdminGroupsComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          curso: this.curso,
          response: params,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
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
      'background-color': element.color_hover,
      color: element.color_active,
    };
  }

  elementStyleHover(element: any) {
    return {
      'background-color': element.color_hover,
      color: element.color_active,
    };
  }

  selectedElement(element: any) {
    this.revisarCheck(element);
  }

  addCheck() {
    if (this.sesion.elements.length > 0) {
      this.sesion.elements.map((el: any) => {
        el.check = false;
      });
    }
  }

  revisarCheck(element: any) {
    if (!element.check) {
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
      data => {
        this.arrayEl = data.data || [];
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
  setCheck(type_element_id: any) {
    if (this.sesion.elements.length > 0) {
      this.sesion.elements.map((el: any) => {
        el.check = false;
        if (Number(el.type_element_id) === Number(type_element_id)) {
          el.check = true;
        }
      });
    }
  }
  deleteElements(el: any) {
    const serviceName = END_POINTS.base_back.elements;
    if (el.id) {
      Swal.fire({
        title: 'Eliminar',
        text: '¿ Desea eliminar ? ',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        // timer: 2000,
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.loading = true;
          this.generalService.deleteNameId$(serviceName, el.id).subscribe(
            r => {
              if (r.success) {
                this.listElements(el.topic_id, el.type_element_id);
                setTimeout(() => {
                  if (this.arrayEl.length <= 0) {
                    this.arrayEl = [];
                    this.validaExist.emit();
                  }
                }, 5000);
              }
            },
            () => {
              this.loading = false;
            },
            () => {
              this.loading = false;
            }
          );
        }
      });
    }
  }
  navigate(element: any): any {
    this.router.navigate([`../asignatures/course/${this.curso.id_carga_curso_docente}/element/${element.id}`], {
      relativeTo: this.activatedRoute.parent,
    });
  }
  openQuestionConfig(params: any) {
    this.dialogService
      .open(QuestionsConfigComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          item: params,
          // curso: this.curso,
          // response: params,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        console.log(result);
        if (result && result.save_close === 'ok') {
          let valid = false;
          if (this.sesion.elements.length > 0) {
            valid = this.sesion.elements.find((r: any) => (r.type_element_id === result.values.type_element_id ? true : false));
            if (valid) {
              this.setCheck(result.values.type_element_id);
              this.listElements(result.values.topic_id, result.values.type_element_id);
            } else {
              this.arrayEl = [];
              this.validaExist.emit();
            }
          }
          // this.filtrar();
        }
      });
  }
}
