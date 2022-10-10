import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GeneralService} from "../../../../providers";
import {NbDialogService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {AppService} from "../../../../core";
import {END_POINTS} from "../../../../providers/utils";
import {AperturaRequestComponent} from "../../apertura-request/view/apertura-request.component";

@Component({
  selector: 'app-table-activities',
  templateUrl: './table-activities.component.html',
  styleUrls: ['./table-activities.component.scss']
})
export class TableActivitiesComponent implements OnInit {
  cursos: any[] = [];
  tipo_elementos: any[] = [];
  userInfo:any;
  @Input() pendings: any[] = [];
  @Output() eventFormHeader: EventEmitter<any> = new EventEmitter();
  // curso_id: any;
  // elemento_id: any;
  pagesCount: any[] = [20, 50, 100, 300, 500];
  estados: any[] = [{nombre: 'Péndientes', value: 'P'}, {nombre: 'Vencidos', value: 'V'}, {nombre: 'Completados', value: 'C'}];

  formHeader: any = FormGroup;
  loading: boolean = false;
  loadingFilters: boolean = false;
  selectedItem: any;

  pagination: any = {
    page: 1,
    per_page: this.pagesCount[0],
    sizePage: 0,
    sizeListData: 0,
    isDisabledPage: false,
  };

  collectionSize = this.pendings.length;
  constructor(
    private generalService: GeneralService,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public datepipe: DatePipe,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    const val = JSON.parse(sesion);
    if (val && val.rol) {
      return val;
    } else {
      return '';
    }
  }

  private fieldReactive() {
    const controls = {
      id_per_page: [this.pagination.per_page || ''],
      id_curso: [''],
      id_tipo_elemento: [''],
      id_estado: [this.estados[0].value || ''],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.listCursos();
    this.eventFormHeader.emit(this.formHeader);
  }
  getUserInfo() {
    return this.userInfo = this.appService.user;
  }

  iconStyle(element: any) {
    return {
      'background-color': element?.background,
    };
  }

  listCursos() {
    this.listTypeElements();
    const serviceName = END_POINTS.base_back.activities_evaluations + '/get-courses-list';
    this.loadingFilters = true;
    this.generalService.nameAll$(serviceName).subscribe(
      (res: any) => {
        this.cursos = res.data || [];
        if (this.cursos.length > 0) {
          //this.listElements();
          this.eventFormHeader.emit(this.formHeader);
        }
      },
      () => {
        this.loadingFilters = false;
      },
      () => {
        this.loadingFilters = false;
      }
    );
  }

  listTypeElements() {
    const serviceName = END_POINTS.base_back.activities_evaluations + '/get-elements-types';
    this.generalService.nameAll$(serviceName).subscribe((res: any) => {
      this.tipo_elementos = res.data || [];
      if (this.tipo_elementos.length>0) {
        this.tipo_elementos = this.tipo_elementos.filter(r => ['TRAB', 'FOR', 'EVAL'].includes(r.codigo));
      }
    });
  }

  selectedPerPage(pages: any) {
    this.pagination.per_page = pages;
    //this.listElements();
  }

  selectedCourse(curso: any) {
    // this.curso_id = curso;
    //this.listElements();
  }

  selectedElement(element: any) {
    // this.elemento_id = element;
    //this.listElements();
  }
  loadPage($event: any): any {
    this.pagination.page = $event;
    //this.listElements();
  }

  navigate(pending: any): any {
    this.router.navigate([`../asignatures/course/${pending.id_carga_curso_docente}/element/${pending.element_id}`], {
      relativeTo: this.activatedRoute.parent,
    });
  }

  refresh() {
    //this.listElements();
  }
  solicitar(element:any){
    this.dialogService.open(AperturaRequestComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        elemento: element,
        pendiente: element,
        rolSemestre: this.rolSemestre,
        userInfo: this.userInfo,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    })
      .onClose.subscribe(result => {
      if (result === 'ok') {
        //this.refreshPending.emit();
      }
    });
  }
}
