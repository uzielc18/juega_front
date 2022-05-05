import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { GeneralService } from "../../../providers";
import { END_POINTS } from "../../../providers/utils";

@Component({
  selector: "app-evaluations-home",
  templateUrl: "./evaluations-home.component.html",
  styleUrls: ["./evaluations-home.component.scss"],
})
export class EvaluationsHomeComponent implements OnInit {
  cursos: any[] = [];
  tipo_elementos: any[] = [];

  elements: any[] = [];

  curso_id: any;
  elemento_id: any;
  pagesCount: any[] = [20, 50, 100, 300, 500];
  estados: any[] = ["Calificados", "Pendientes", "Próximo", "Re-apertura"];

  formHeader: any = FormGroup;
  loading: boolean = false;
  selectedItem: any;

  pagination: any = {
    page: 1,
    per_page: this.pagesCount[0],
    sizePage: 0,
    sizeListData: 0,
    isDisabledPage: false,
  };

  collectionSize = this.elements.length;

  constructor(
    private generalService: GeneralService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fieldReactive();
  }

  private fieldReactive() {
    const controls = {
      id_per_page: [this.pagination.per_page || "", [Validators.required]],
      id_curso: ["", [Validators.required]],
      id_tipo_elemento: ["", [Validators.required]],
      id_estado: [this.estados[0] || "", [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.listCursos();
  }

  iconStyle(element: any) {
    return {
      "background-color": element?.background,
    };
  }

  listCursos() {
    this.listTypeElements();
    const serviceName = END_POINTS.base_back.activities_evaluations + "/get-courses-list";
    this.generalService.nameAll$(serviceName).subscribe(
      (res: any) => {
        this.cursos = res.data || [];
        this.cursos.unshift({ id: "ALL", nombre: "TODOS" });
        if (this.cursos.length > 0) {
          this.formHeader.patchValue({
            id_curso: this.cursos[0].id,
          });
          this.curso_id = this.cursos[0];
          this.listElements();
        }
      },
      () => {},
      () => {}
    );
  }

  listTypeElements() {
    const serviceName = END_POINTS.base_back.activities_evaluations + "/get-elements-types";
    this.generalService.nameAll$(serviceName).subscribe((res: any) => {
      this.tipo_elementos = res.data || [];
      this.tipo_elementos.unshift({ id: "ALL", nombre: "TODOS" });
      if (this.tipo_elementos.length > 0) {
        this.formHeader.patchValue({
          id_tipo_elemento: this.tipo_elementos[0].id,
        });
        this.elemento_id = this.tipo_elementos[0];
      }
    });
  }

  selectedPerPage(pages: any) {
    this.pagination.per_page = pages;
    this.listElements();
  }

  selectedCourse(curso: any) {
    this.curso_id = curso;
    this.listElements();
  }

  selectedElement(element: any) {
    this.elemento_id = element;
    this.listElements();
  }

  // table
  listElements() {
    this.elements = [];
    const params = {
      calificable: 1,
      course_id: this.curso_id.id,
      page: this.pagination.page,
      per_page: this.pagination.per_page,
      type_element_id: this.elemento_id.id,
    };
    const serviceName = END_POINTS.base_back.activities_evaluations + "/get-my-activities";
    this.loading = true;
    this.generalService.nameParams$(serviceName, params).subscribe(
      (res: any) => {
        this.elements = res.data.data || [];
        this.pagination.sizeListData = (res.data && res.data.total) || 0;
        this.pagination.sizePage = (res.data && res.data.per_page) || 0;
        if (this.pagination.sizeListData < this.elements.length) {
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

  navigate(element: any): any {
    // this.router.navigate([`../asignatures/course/${element.id_carga_curso_docente}/element/${element.id}`], {
    // relativeTo: this.activatedRoute.parent,
    // });
    window.open(`../pages/asignatures/course/${element.id_carga_curso_docente}/element/${element.id}`, "_blank");
  }

  refresh() {
    this.listElements();
  }
}
