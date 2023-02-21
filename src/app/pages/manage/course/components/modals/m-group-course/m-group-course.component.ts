import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-m-group-course',
  templateUrl: './m-group-course.component.html',
  styleUrls: ['./m-group-course.component.scss']
})
export class MGroupCourseComponent implements OnInit {

  formGroupManual: any = FormGroup;
  formGenerar: any = FormGroup;
  formImportar: any = FormGroup;
  formGroup: any = FormGroup;
  arregloDeArreglos: any = [];
  listTrabajos: any = [];
  memberGroup: any = [];
  listGroups:any = [];
  datosGrup: any = {
    g_completos: 0,
    g_imcompletos: 0,
    n_imc: 0,
  };
  type: any;
  @Input() item: any;
  loading: any = false;
  alumnsPending: any = [];
  partidos:any = {
    array_A: [],
    array_B: [],
  }
  constructor(public activeModal: NbDialogRef<MGroupCourseComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  private fieldGrupManual() {
    const controls = {
      nombre_grupo: ['', [Validators.required]],
      opc: ['NEWS'],
      id_group: [''],
    };
    this.formGroupManual = this.fb.group(controls);
  }
  private fieldGrupo() {
    const controls = {
      nombre_grupo: [''],
      group_id: ['']
    };
    this.formGroup = this.fb.group(controls);
  }
  recorrerGroup() {
    this.fieldGrupo();
    this.memberGroup = [];
    this.alumnsPending = [];
    this.partidos.array_A = [];
    this.partidos.array_B = [];

    this.listGroups.map((r:any) => {
      r.color = '';
      r.checks = false;
    });
  }
  private fieldGenerar() {
    const controls = {
      n_miembros: ['', [Validators.required]],
      aleatorio: [false],
    };
    this.formGenerar = this.fb.group(controls);
  }
  private fieldImportar() {
    const controls = {
      selected_element_id: ['', [Validators.required]],
    };
    this.formImportar = this.fb.group(controls);
  }
  closeModal() {
    this.activeModal.close('');
  }
  deleteMembersGroup(item: any) {

  }
  refresForms() {
    this.fieldGrupManual();
    this.fieldGenerar();
    this.fieldImportar();
  }
  selectTabChange($event:any) {
    this.type = '';
    const idTab = $event.tabId;
    this.refresForms();
    this.vaciarDatosGroup();
    switch (idTab) {
      case 'GM': // Generar manual
        this.type = idTab;
        break;
      case 'G': //Generar
        this.type = idTab;
        this.getListMember();
        break;
      case 'I': //Importar
        this.type = idTab;
        this.getListTrabs();
        break;
      default:
        this.type = '';
        break;
    }
  }
  vaciarDatosGroup() {

  }
  cancelSave() {
    this.fieldGrupManual();
    this.recorrerGroup();
  }
  getListTrabs() {

  }
  getListMember() {

  }
}
