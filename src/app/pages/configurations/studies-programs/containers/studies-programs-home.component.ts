import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";
import {EditUserComponent} from "../../../../shared/components/edit-user/edit-user.component";
import {NbDialogService} from "@nebular/theme";
import {MdStudiesProgramsComponent} from "../components/md-studies-programs/md-studies-programs.component";

@Component({
  selector: 'app-studies-programs-home',
  templateUrl: './studies-programs-home.component.html',
  styleUrls: ['./studies-programs-home.component.scss']
})
export class StudiesProgramsHomeComponent implements OnInit {

  loading: boolean = false;
  formHeader: any = FormGroup;
  success: boolean = false;
  sedes: any = [];
  nivelEnsenanza: any = [];
  facultades: any = [];
  litProgramStudy: any = [];

  selectedItem = 20;
  pagination: any = {
    page: 1,
    per_page: 20,
    sizePage: 0,
    sizeListData: 0,
    isDisabledPage: false,
  };
  pagesCount: any[] = [20, 30, 50, 100, 200, 300, 500, 1000];
  constructor( private fb: FormBuilder,
               private generalServi: GeneralService,
               private dialogService: NbDialogService,) { }

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
      ciclo: [''],
      facultades_unidades: [{ value: '', disabled: true }],
      buscar: [''],
      nivel_ensenanza:[{ value: '', disabled: true }],
      sede:[''],
    };
    this.formHeader = this.fb.group(controls);
    this.listSedes();
  }

  listSedes() {
    const serviceName = END_POINTS.base_back.default + 'sedes';
    this.loading = true;
    this.generalServi.nameAll$(serviceName).subscribe(
      (res: any) => {
        this.sedes = res.data || [];
        if (this.sedes.length > 0) {
          this.formHeader.patchValue({
            sede: this.sedes[0],
          });
          this.formHeader.controls['nivel_ensenanza'].enable();
          this.listNivelEnsenanza(this.sedes[0].id);
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
  selectedSede(sede: any) {
    this.formHeader.controls['sede'].setValue(sede);
    this.formHeader.controls['nivel_ensenanza'].enable();
    this.nivelEnsenanza = [];
    this.facultades = [];
    this.formHeader.controls['nivel_ensenanza'].setValue('');
    this.formHeader.controls['facultades_unidades'].setValue('');
    this.listNivelEnsenanza(sede.id);
  }
  listNivelEnsenanza(sede_id: any) {
    const serviceName = END_POINTS.base_back.nivel_ensenanza;
    if (this.sedes.length > 0) {
      this.loading = true;
      this.generalServi.nameId$(serviceName, sede_id).subscribe(
        (res: any) => {
          this.nivelEnsenanza = res.data || [];
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
  selectedNivel(nivel: any) {
    this.formHeader.controls['nivel_ensenanza'].setValue(nivel);
    this.formHeader.controls['facultades_unidades'].enable();
    this.facultades = [];
    this.formHeader.controls['facultades_unidades'].setValue('');
    this.getFacultadesUnidades(nivel.id, this.formHeader.get('sede').value.id);
  }
  getFacultadesUnidades(nivel: any, sedeId: any){
    const serviceName = END_POINTS.base_back.sede_areas;
    const params = {
      all: 0
    }
    this.loading = true;
    this.generalServi.nameIdAndIdParams$(serviceName, nivel, sedeId, params).subscribe(
      (res: any) => {
        this.facultades = res.data || [];
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
  selecFacultades(item:any){
    this.formHeader.controls['facultades_unidades'].setValue(item);
  }
  listProgramEstudy(){
    this.loading = true
    const serviceName = 'list-programa-estudios';
    const forms = this.formHeader.controls['facultades_unidades'].value
    const id_nive_enseanza = forms.nivel_ensenanza_id;
    const id_area = forms.id;
    const id_sede = this.rolSemestre.area.sede_id;
    const params = {
      programa_estudio_id: this.rolSemestre.area.programa_estudio_id,
    }
    if (id_sede && id_nive_enseanza) {
      this.generalServi.nameIdAndIdAndIdParams$(serviceName, id_nive_enseanza, id_sede, id_area, params).subscribe((res:any) => {
        this.litProgramStudy = res.data || [];
        this.success = true;
        if (this.litProgramStudy.length>0) {
          this.litProgramStudy.map((r:any) => {
            r.name_programa_estudio = r.nombre_corto + ' - ' + (r.sede_nombre ? r.sede_nombre : '');
            if (r.semiprecencial_nombre) {
              r.name_programa_estudio = r.nombre_corto + ' (' + r.sede_nombre + ' - ' + r.semiprecencial_nombre + ' )';
            }
          })
          // this.getZoom();
        }
      }, () => {this.loading = false}, () => {this.loading = false});

    }
  }
  refresh(){
    this.listProgramEstudy()
  }
  loadPage($event: any): any {
    this.pagination.page = $event;
    //this.getStudents();
  }

  sizeTable($event: any): any {
    this.pagination.per_page = $event;
    //this.getStudents();
  }
  editListProgramStudy(item: any, code: any) {
    this.dialogService
      .open(MdStudiesProgramsComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          item: item,
          code: code
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
      if (result === 'ok') {
        this.listProgramEstudy();
      }
    });
  }
}
