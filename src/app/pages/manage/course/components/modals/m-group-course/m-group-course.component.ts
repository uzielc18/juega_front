import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";

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
  constructor(public activeModal: NbDialogRef<MGroupCourseComponent>, private fb: FormBuilder, private generalService: GeneralService) { }

  ngOnInit(): void {
  }

  private fieldGrupManual() {
    const controls = {
      nombre_curso: ['', [Validators.required]],
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
  saveGM() {
    const serviceName = 'courses';
    const item = this.item;
    const forms =  this.formGroupManual.value;
    const params = {
      course_id: item.id,
      programa_estudio_id: item.programa_estudio_id,
      area_id: item.area_id,
      semester_id: item.semester_id,
      sede_area_id: item.sede_area_id,
      persons_teacher_id: item.persons_teacher_id,
      person_id_canva: item.person_id_canva,
      courses_type_id:  item.courses_type_id,
      courses_type_nombre: item.courses_type_nombre,
      id_carga_curso: item.id_carga_curso,
      id_carga_curso_docente: null,
      nombre: forms.nombre_curso,
      course_nombre: forms.nombre_curso,
      descripcion: item.descripcion,
      portada: item.portada,
      portada_miniatura: item.portada_miniatura,
      silabo: item.silabo,
      guia_curso: item.guia_curso,
      grupo: item.grupo,
      ciclo: item.ciclo,
      aula: item.aula,
      idioma: item.idioma,
      cupos: item.cupos,
      precio: item.precio,
      precio2: item.precio2,
      clave_inscripcion: item.clave_inscripcion,
      porcentaje_aprobacion: item.porcentaje_aprobacion,
      min_nota: item.min_nota,
      tipo_nota: item.tipo_nota,
      fecha_inicio: item.fecha_inicio,
      fecha_fin: item.fecha_fin,
      fecha_inicio_inscripcion: item.fecha_inicio_inscripcion,
      fecha_fin_inscripcion: item.fecha_fin_inscripcion,
      chat: item.chat,
      consultas: item.consultas,
      inscripcion: item.inscripcion,
      pago: item.pago,
      estado: item.estado,
      ht: item.ht,
      hp: item.hp,
      hnp: item.hnp,
      modo_curso: item.modo_curso,
      url_video: item.url_video,
      url_compartir: item.url_compartir,
      descuento: item.descuento,
      clave: item.clave,
      code_category: item.code_category,
      join_url: item.join_url,
      host_key: item.host_key,
      id_zoom_meetings: item.id_zoom_meetings,
    }
    this.loading = true;
    this.generalService.addNameData$(serviceName, params).subscribe(res => {
      if(res.success) {

      }
    }, () => {this.loading = false}, () => {this.loading = false})
  }
}
