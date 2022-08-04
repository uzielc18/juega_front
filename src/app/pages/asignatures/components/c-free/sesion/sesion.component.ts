import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { AdminGroupsComponent } from '../../modals/admin-groups/admin-groups.component';
import { HomeworkFormComponent } from '../../modals/homework-form/homework-form.component';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsConfigComponent } from '../../modals/questions-config/questions-config.component';
import { ModoViewComponent } from '../../modals/modo-view/modo-view.component';
import { OrdenElementsComponent } from '../../modals/orden-elements/orden-elements.component';
import {MSatisfactionComponent} from "../../../../../shared/components/satisfaction/modal/m-satisfaction.component";
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

  ngOnInit(): void {

    //console.log(this.sesion, 'sesson');

  }
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

          if (this.sesion?.modo === 'agrupado') {
            // console.log(result, 'Response de save');
            this.cargarCambio(result)
            result.type_element.type_element_id = result.type_element.id;
            console.log(this.sesion.elements)
            if (this.sesion.elements.length > 0) {
              const exist = this.sesion.elements.find((r: any) => ((r.type_element_id === result.type_element.id) ? true : false));
              if (exist) {
                this.cargarCambio(result);
              } else {
                this.sesion.elements.push(result.type_element);
                this.cargarCambio(result);
              }
            } else {
              this.sesion.elements.push(result.type_element);
              this.cargarCambio(result);
            }
          }

          if (result.response && result.response.id && result.value.grupal === '1') {
            const params = {
              id: result.response.id, // id del elemento.
              course_id: this.curso.id,
            };
            this.openGroups(params);
          }

          if (this.sesion?.modo === 'ordenado') {
            this.listElementOrden(result.response.topic_id);
          }
        }
      });
  }
  cargarCambio(result:any) {
    this.setCheck(result.type_element.id);
    this.listElements(result.response.topic_id, result.type_element.id);
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
  selectedElemenstOrden(topic: any) {
    this.listElementOrden(topic.id);

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
        console.log(this.arrayEl)
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
  listElementOrden(topic: any) {
    const serviceName = END_POINTS.base_back.resourse + '/list-elements-order';
    const topic_id = topic;
    this.loading = true;
    this.generalService.nameId$(serviceName, topic_id).subscribe(
      data => {
        this.arrayEl = data.data || [];
        console.log(this.arrayEl)
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
    console.log(type_element_id, 'ups');
    console.log(this.sesion.elements)
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
          this.generalService.deleteNameId$(serviceName, el.id).subscribe(r => {
              if (r.success) {
                if (this.sesion.modo === 'agrupado') {
                  this.listElements(el.topic_id, el.type_element_id);
                  setTimeout(() => {
                    if (this.arrayEl.length <= 0) {
                      this.arrayEl = [];
                      this.validaExist.emit();
                    }
                  }, 5000);
                }
                if (this.sesion.modo === 'ordenado') {
                  this.listElementOrden(el.topic_id);
                  setTimeout(() => {
                    if (this.arrayEl.length <= 0) {
                      this.arrayEl = [];
                      this.validaExist.emit();
                    }
                  }, 5000);
                }
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
    if ((element.listo === 1 && this.rolSemestre.rol.name === 'Estudiante' && this.sesion?.modo === 'ordenado') || ['Docente', 'Admin'].includes(this.rolSemestre?.rol?.name) || this.sesion?.modo === 'agrupado') {
      this.router.navigate([`../asignatures/course/${this.curso.id_carga_curso_docente}/element/${element.id}`], {
        relativeTo: this.activatedRoute.parent,
      });
    }
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
        // console.log(result);
        if (result && result.save_close === 'ok') {

          if (this.sesion.modo === 'agrupado') {
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

          }
          if (this.sesion.modo === 'ordenado') {
            this.listElementOrden(result.values.topic_id);
          }
          // this.filtrar();
        }
      });
  }
  openModo(sesion:any) {
    this.dialogService.open(ModoViewComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          item: sesion,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        if (result === 'ok') {
          this.arrayEl = [];
          this.validaExist.emit();
        }
      });
  }
  openElementosOrden() {
    this.dialogService.open(OrdenElementsComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          arrayElementos: this.arrayEl,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        if (result === 'ok') {
          this.arrayEl = [];
          this.validaExist.emit();
        }
      });
  }
  openSatisfaction(){
    this.dialogService.open(MSatisfactionComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        item: '',
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    })
      .onClose.subscribe(result => {
      if (result === 'ok') {
        this.arrayEl = [];
        this.validaExist.emit();
      }
    });
  }
}
