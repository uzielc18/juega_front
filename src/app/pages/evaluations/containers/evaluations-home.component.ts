import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "src/app/core";
import { GeneralService } from "../../../providers";
import { END_POINTS } from "../../../providers/utils";
import {
  RequestAperturaComponent
} from "../../asignatures/components/modals/request-apertura/request-apertura.component";
import {NbDialogService} from "@nebular/theme";
import {AperturaRequestComponent} from "../../../shared/components/apertura-request/view/apertura-request.component";

@Component({
  selector: "app-evaluations-home",
  templateUrl: "./evaluations-home.component.html",
  styleUrls: ["./evaluations-home.component.scss"],
})
export class EvaluationsHomeComponent implements OnInit {
  cursos: any[] = [];
  tipo_elementos: any[] = [];
  userInfo:any;
  pendings: any[] = [];

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
  ) {}

  ngOnInit(): void {
    this.fieldReactive();
    this.getUserInfo();
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
          this.listElements();
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
    this.listElements();
  }

  selectedCourse(curso: any) {
    // this.curso_id = curso;
    this.listElements();
  }

  selectedElement(element: any) {
    // this.elemento_id = element;
    this.listElements();
  }

  // table
  listElements() {
    this.pendings = [];
    const params = {
      persons_student_id: this.appService.user.person.id,
      course_id: this.formHeader.value.id_curso,
      page: this.pagination.page,
      per_page: this.pagination.per_page,
      type_element_id: this.formHeader.value.id_tipo_elemento,
      filterEstado: this.formHeader.value.id_estado,
      origin: 'evaluaciones',
    };
    const serviceName = END_POINTS.base_back.activities_evaluations + '/get-my-activities';
    this.loading = true;
    this.generalService.nameParams$(serviceName, params).subscribe(
      (res: any) => {
        this.pendings = res.data.data || [];
        if(this.pendings.length>0) {
          this.pendings.map((r:any) => {
            r.reapertura = false;
            r.fecha_actual = this.datepipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');
            if (r.total_justification === 0 && (r.fecha_fin <= r.fecha_actual)) {
              r.reapertura = true;
            }
            const a = r.fecha_actual.split(' ');
            const f = r.fecha_fin.split(' ');
            const aa = new Date(a[0]).getTime();
            const ff = new Date(f[0]).getTime();
            const t = ff - aa;
            r.dias = Number(t/(1000*60*60*24)).toFixed(0);
          })
        }
        console.log(this.pendings);

        this.pagination.sizeListData = (res.data && res.data.total) || 0;
        this.pagination.sizePage = (res.data && res.data.per_page) || 0;
        if (this.pagination.sizeListData < this.pendings.length) {
          this.pagination.isDisabledPage = true;
        } else {
          this.pagination.isDisabledPage = false;
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

  loadPage($event: any): any {
    this.pagination.page = $event;
    this.listElements();
  }

  navigate(pending: any): any {
    this.router.navigate([`../asignatures/course/${pending.id_carga_curso_docente}/element/${pending.element_id}`], {
      relativeTo: this.activatedRoute.parent,
    });
  }

  refresh() {
    this.listElements();
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
