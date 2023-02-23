import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";
import Swal from "sweetalert2";

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
    this.getData();
    this.fieldGrupManual();
    this.fieldGrupo();
    this.fieldGenerar();
  }

  private fieldGrupManual() {
    const controls = {
      nombre_curso: ['', [Validators.required]],
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
  closeModal() {
    this.activeModal.close('');
  }
  deleteMembersGroup(item: any) {

  }
  refresForms() {
    this.fieldGrupManual();
    this.fieldGenerar();
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
  getListTrabs() {

  }
  getListMember() {

  }

  getData() {
    const serviceName = 'courses';
    const item = this.item;
    const params = {
      course_id: item.id,
      paginate: 'N',
      semester_id: item.semester_id,
    }
    this.loading = true;
    this.generalService.nameParams$(serviceName, params).subscribe(res => {
      if(res.success){
          this.listGroups = res.data
      }
    }, () => {this.loading = false}, () => {this.loading = false})
  }
  saveGM() {
    const serviceName = 'courses';
    const item = this.item;
    const forms =  this.formGroupManual.value;
    this.loading = true;
    if(forms.opc === 'NEWS') {
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

      this.generalService.addNameData$(serviceName, params).subscribe(res => {
        if(res.success) {
          this.getData()
          this.fieldGrupManual();
        }
      }, () => {this.loading = false}, () => {this.loading = false})
    } else {
      const params = {
        nombre: forms.nombre_curso,
      }
      this.generalService.updateNameIdData$(serviceName, forms.id_group, params).subscribe(res => {
        if(res.success) {
          this.fieldGrupManual();
          this.getData();
        }

      },() => {this.loading = false}, () => {this.loading = false})
    }

  }
  updateGruop(item: any) {
    console.log(item)
    this.formGroupManual.patchValue({
      opc: 'U',
      id_group: item.id,
      nombre_curso: item.nombre,
    });
  }
  get validPending() {
    if (this.partidos.array_A.length <= 0 && this.partidos.array_B.length <= 0) {
      return true;
    } else {
      return false;
    }
  }
  cancelSave() {
    this.fieldGrupManual();
    this.recorrerGroup();
  }
  viewMembers(item: any) {
    console.log(item)
    this.formGroup.patchValue({
      nombre_grupo: item.nombre,
      group_id:item.id,
    })
    this.getListMemberSinGroup();
    this.getListMembGroup(item.id_carga_curso_docente); // id grupo
  }
  getListMemberSinGroup() {
    const serviceName = 'get-sin-matriculas';
    const item = this.item;
    this.loading = true;
    this.generalService.nameId$(serviceName, item.id).subscribe(res => {
      this.alumnsPending = res.data || [];
      if (this.alumnsPending.length>0) {
        this.alumnsPending.map((res:any) => {
          res.checked = false;
        });
        this.partirArrayPending();
      }

    }, () => {this.loading = false}, () => {this.loading = false})
  }
  partirArrayPending() {
    this.partidos.array_A = [];
    this.partidos.array_B = [];

    if (this.alumnsPending.length > 0) {

      this.partidos.array_A = this.alumnsPending.splice(0,(this.alumnsPending.length/2));

      // console.log("Mitad 1 --> ",this.partidos.array_A);

      this.partidos.array_B = this.alumnsPending.splice(0,this.alumnsPending.length);
      // console.log("Mitad 2 -->",this.partidos.array_B);
    }
  }
  getListMembGroup(id: any) {
    const serviceName = 'list-student';
    this.loading = true;
    this.generalService.nameId$(serviceName, id).subscribe(res => {
          if(res.success) {
            this.memberGroup = res.data
          }
    },() => {this.loading = false}, () => {this.loading = false})
  }
  matricularCodigos() {

    const serviceName = 'matricular-codigos';
    let array:any = [];

    if (this.partidos.array_A.length>0) {
      this.partidos.array_A.map((res:any) => {
        if (res.checked) {
          array.push(res.codigo);
        }
      });
    }
    if (this.partidos.array_B.length>0) {
      this.partidos.array_B.map((res:any) => {
        if (res.checked) {
          array.push(res.codigo);
        }
      });
    }
    console.log(this.partidos.array_A, 'B', this.partidos.array_B)
    console.log(array)
    const params = {
      codigos: array.join(',') || '',
    }
    console.log(this.formGroup.value.group_id, params)
    if (params && params.codigos) {
      Swal.fire({
        title: 'MATRICULAR',
        text: '¿ Desea matricular a los estudiantes ? ',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#00244E',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        // timer: 2000,
      }).then((result:any) => {
        if (result.isConfirmed) {
          this.loading = true;
          this.generalService.addNameIdData$(serviceName, this.formGroup.value.group_id, params).subscribe((res:any) => {
            if (res.success) {
              this.getListMembGroup(this.formGroup.value.group_id); // id grupo
              this.getListMemberSinGroup();
              this.partirArrayPending();
            }
          }, () => {this.loading = false;}, () => {this.loading = false;});
        }
      });
    }
  }
  deleteCurso(item:any) {
    const serviceName = 'courses';
    Swal.fire({
      title: 'ELIMINAR',
      text: '¿ Desea eliminar el curso ? ',
      backdrop: true,
      icon: 'question',
      // animation: true,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#00244E',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      // timer: 2000,
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.generalService.deleteNameId$(serviceName, item.id).subscribe((res:any) => {
          if (res.success) {
            this.getData();
          }
        }, () => {this.loading = false}, () => {this.loading = false});
      }
    });
  }
}
