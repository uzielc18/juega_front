import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html',
  styleUrls: ['./admin-groups.component.scss']
})
export class AdminGroupsComponent implements OnInit {
  formGroupManual: any = FormGroup;
  formGenerar: any = FormGroup;
  formImportar: any = FormGroup;
  formGroup: any = FormGroup;
  @Input() item: any;
  @Input() code: any;
  @Input() curso:any;
  @Input() response: any;
  loading: boolean = false;
  listMiembros:any = [];
  arregloDeArreglos:any = [];
  datosGrup: any = {
    g_completos: 0,
    g_imcompletos: 0,
    n_imc: 0,
  };
  listGroups:any = [];
  type: any;
  alumnsPending: any = [];
  partidos:any = {
    array_A: [],
    array_B: [],
  }

  @ViewChild('item1') tabGM:any;
  @ViewChild('item2') tabG:any;
  @ViewChild('item3') tabI:any;
  listTrabajos:any = [];
  memberGroup: any = [];
  constructor(public activeModal: NbDialogRef<AdminGroupsComponent>, private formBuilder: FormBuilder, private generalServi: GeneralService,
    private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.fieldGrupManual();
    this.fieldGenerar();
    this.fieldImportar();
    this.fieldGrupo();
    this.getListGroups();
  }
  private fieldGrupManual() {
    const controls = {
      nombre_grupo: ['', [Validators.required]],
      opc: ['NEWS'],
      id_group: [''],
    };
    this.formGroupManual = this.formBuilder.group(controls);
  }
  private fieldGenerar() {
    const controls = {
      n_miembros: ['', [Validators.required]],
      aleatorio: [false],
    };
    this.formGenerar = this.formBuilder.group(controls);
  }
  private fieldImportar() {
    const controls = {
      selected_element_id: ['', [Validators.required]],
    };
    this.formImportar = this.formBuilder.group(controls);
  }
  private fieldGrupo() {
    const controls = {
      nombre_grupo: [''],
      group_id: ['']
    };
    this.formGroup = this.formBuilder.group(controls);
  }
  getListGroups() {
    this.fieldGrupo();
    this.memberGroup = [];
    this.alumnsPending = [];
    this.partidos.array_A = [];
    this.partidos.array_B = [];

    const serviceName = 'list-group';
    if (this.response.id) { //element id
      this.loading = true;
      this.generalServi.nameId$(serviceName, this.response.id).subscribe((res:any) => {
        this.listGroups = res.data || [];
        if (this.listGroups.length>0) {
          this.setTab();
        }
      }, () => { this.loading =false; }, () => { this.loading =false; });
    }
  }
  closeModal() {
      this.activeModal.close('close');
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
  getListMember() {
    this.listMiembros = [];
    const serviceName = 'list-sin-group';
    if (this.response.id) { //element id
      this.loading = true;
      this.generalServi.nameIdAndId$(serviceName, this.response.course_id, this.response.id).subscribe((res:any) => {
        this.listMiembros = res.data || [];
      }, () => { this.loading =false; }, () => { this.loading =false; });
    }
  }
  getListMemberSinGroup() {
    this.alumnsPending = [];
    const serviceName = 'list-sin-group';
    if (this.response.id) { //element id
      this.loading = true;
      this.generalServi.nameIdAndId$(serviceName, this.response.course_id, this.response.id).subscribe((res:any) => {
        this.alumnsPending = res.data || [];
        if (this.alumnsPending.length>0) {
          this.alumnsPending.map((res:any) => {
            res.checked = false;
          });
          this.partirArrayPending();
        }
      }, () => { this.loading =false; }, () => { this.loading =false; });
    }
  }
  getListTrabs() {
    this.listTrabajos = [];
    const serviceName = 'importar-group';
    if (this.response.course_id) { //element id
      this.loading = true;
      this.generalServi.nameId$(serviceName, this.response.course_id).subscribe((res:any) => {
        this.listTrabajos = res.data || [];
      }, () => { this.loading =false; }, () => { this.loading =false; });
    }
  }
  getListMembGroup(id_grup:any) {
    const serviceName = 'list-members-group';
    if (id_grup) { //element id
      this.loading = true;
      this.generalServi.nameId$(serviceName, id_grup).subscribe((res:any) => {
        this.memberGroup = res.data || [];
      }, () => { this.loading =false; }, () => { this.loading =false; });
    }
  }
  refresForms() {
    this.fieldGrupManual();
    this.fieldGenerar();
    this.fieldImportar();
  }
  formarGrupos() {
    let lists = this.listMiembros;
    this.arregloDeArreglos = [];
    const form = this.formGenerar.value;
    if (lists.length>0 && form.n_miembros > 0) {

      if (form.aleatorio) {
        lists = lists.sort(function() { return Math.random() - 0.5 });
      }

      for (let i = 0; i < lists.length; i += form.n_miembros) {
        let pedazo = lists.slice(i, i + form.n_miembros);
        this.arregloDeArreglos.push(pedazo);
      }
      this.caldatosGrup();
    }
    // console.log("Arreglo de arreglos: ", this.arregloDeArreglos);
  }
  valueMembers() {
    this.arregloDeArreglos = [];
  }
  caldatosGrup() {
    const form = this.formGenerar.value;
    this.vaciarDatosGroup();
    let grupsCompletos = [];
    let groupsImcomplets = [];
    if (this.arregloDeArreglos.length > 0) {
      this.arregloDeArreglos.map((r:any) => {
        if(r.length === Number(form.n_miembros)) {
          grupsCompletos.push(r);
        } else {
          groupsImcomplets.push(r);
        }
      });
      this.datosGrup.g_completos = grupsCompletos.length;
      this.datosGrup.g_imcompletos = groupsImcomplets.length;

      if (grupsCompletos.length > 0) {
        this.datosGrup.n_imc = this.listMiembros?.length - (grupsCompletos.length * Number(form.n_miembros));
      } else {
        this.datosGrup.n_imc = this.listMiembros?.length - Number(form.n_miembros);
      }
    }

  }
  vaciarDatosGroup() {
      this.datosGrup.g_completos = 0;
      this.datosGrup.g_imcompletos = 0;
      this.datosGrup.n_imc = 0;
  }
  get disabledGenerate () {
    const form = this.formGenerar.value;
    if (!form.n_miembros || (form.n_miembros > this.listMiembros.length) || this.listMiembros.length <= 0) {
      return true;
    } else {
      return false;
    }
  }
  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }
  changeAleatorio() {
    this.vaciarDatosGroup();
    this.arregloDeArreglos = [];
    const forms = this.formGenerar.value;
    if (!forms.aleatorio) {
      this.getListMember();
    }
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
  setTab() {
    this.tabGM.active = true;
    this.tabG.active = false;
    this.tabI.active = false;
    this.type = 'GM';
  }

  saveGM() {
    const serviceName = 'groups';
    const forms = this.formGroupManual.value;
    const params = {
        nombre: forms.nombre_grupo,
        element_id: this.response.id,
        course_id: this.response.course_id,
      }
      if (params && params.nombre && params.course_id && params.element_id) {
        this.loading = true;
        if (forms.opc === 'NEWS') {
          this.generalServi.addNameData$(serviceName, params).subscribe(r => {
            if (r.success) {
              this.getListGroups();
              this.fieldGrupManual();
            }
          }, () => { this.loading =false; }, () => { this.loading =false; });
        } else {
          this.generalServi.updateNameIdData$(serviceName, forms.id_group, params).subscribe(r => {
            if (r.success) {
              this.getListGroups();
              this.fieldGrupManual();
            }
          }, () => { this.loading =false; }, () => { this.loading =false; });
        }
      }
  }
  updateGruop(item:any) {
    this.recorrerGroup();
    item.color = '#fce9e6';
    item.checks = true;
    this.formGroupManual.patchValue({
      opc: 'U',
      id_group: item.id,
      nombre_grupo: item.nombre,
    });
  }
  cancelSave() {
    this.fieldGrupManual();
    this.recorrerGroup();
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
  deleteGroup(item:any) {
    const serviceName = 'groups';
    if (item.id) {
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
      }).then((result:any) => {
          if (result.isConfirmed) {
            this.loading = true;
            this.generalServi.deleteNameId$(serviceName, item.id).subscribe(r => {
              if (r.success) {
                this.getListGroups();
              }
            }, () => { this.loading =false; }, () => { this.loading =false; });
          }
        });
      }
  }

  saveGenerate() {
    const serviceName = 'save-list-group-members';
    let arrays:any = [];
    let i = 1;
    this.arregloDeArreglos.map((res:any) => {
     const numG = i++;
      const params = {
          nombre: 'Grupo' + ' ' + numG,
          element_id: this.response.id,
          course_id: this.response.course_id,
          members: res,
        }
      arrays.push(params);
    });
    // console.log(arrays, 'array', this.arregloDeArreglos, 'arrardearray');
      if (arrays.length>0) {
        this.loading = true;
          this.generalServi.addNameData$(serviceName, arrays).subscribe(r => {
            if (r.success) {
              this.getListGroups();
              this.fieldGenerar();
              this.arregloDeArreglos = [];
              this.vaciarDatosGroup();
            }
          }, () => { this.loading =false; }, () => { this.loading =false; });
      }
  }
  saveImportar() {
    const serviceName = 'importar-save';
    const forms = this.formImportar.value;
    const params = {
        selected_element_id: forms.selected_element_id,
        element_id: this.response.id,
        course_id: this.response.course_id,
      }
      if (params && params.selected_element_id && params.course_id && params.element_id) {
        this.loading = true;

          this.generalServi.addNameData$(serviceName, params).subscribe(r => {
            if (r.success) {
              this.getListGroups();
              this.fieldImportar();
            }
          }, () => { this.loading =false; }, () => { this.loading =false; });
      }
  }
  viewMembers(item?:any) {
    item.color = '#fce9e6';
    this.formGroup.patchValue({
      nombre_grupo: item.nombre,
      group_id:item.id,
    })
    this.getListMemberSinGroup();
    this.getListMembGroup(item.id); // id grupo
  }
  get validPending() {
    if (this.partidos.array_A.length <= 0 && this.partidos.array_B.length <= 0) {
      return true;
    } else {
      return false;
    }
  }
  get validPAna() {
    let arraySelected = [];
    if (this.partidos.array_A.length > 0) {
      this.partidos.array_A.map((res:any) => {
        if (res.checked) {
          arraySelected.push(res);
        }
      })
    }
    if (this.partidos.array_B.length > 0) {
      this.partidos.array_B.map((res:any) => {
        if (res.checked) {
          arraySelected.push(res);
        }
      })
    }
    return arraySelected.length > 0 ? false : true;
  }

  anadirPending() {
    const serviceName = 'groupMembers';
    let array:any = [];
    if (this.partidos.array_A.length>0) {
      this.partidos.array_A.map((res:any) => {
        if (res.checked) {
          const datoA = {
            group_id: this.formGroup.value.group_id,
            codigo: res.codigo,
            persons_student_id: res.persons_student_id,
          }
          array.push(datoA);
        }
      });
    }
    if (this.partidos.array_B.length>0) {
      this.partidos.array_B.map((res:any) => {
        if (res.checked) {
          const datoB = {
            group_id: this.formGroup.value.group_id,
            codigo: res.codigo,
            persons_student_id: res.persons_student_id,
          }
          array.push(datoB);
        }
      });
    }
    if (array.length>0) {
      this.loading = true;
      this.generalServi.addNameData$(serviceName, array).subscribe(r => {
        if (r.success) {
          this.getListMembGroup(this.formGroup.value.group_id); // id grupo
          this.getListMemberSinGroup();
          this.calculaNMember();
          this.partirArrayPending();
        }
      }, () => { this.loading =false; }, () => { this.loading =false; });
    }
  }
  calculaNMember() {
    setTimeout(() => {
      this.listGroups.map((a:any) => {
        if (this.formGroup.value.group_id === a.id) {
          a.group_members_count = this.memberGroup.length;
        }
      });
    }, 20000);
  }
  deleteMembersGroup(item:any) {
    const serviceName = 'groupMembers';
    if (item.id) {
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
      }).then((result:any) => {
          if (result.isConfirmed) {
            this.loading = true;
            this.generalServi.deleteNameId$(serviceName, item.id).subscribe(r => {
              if (r.success) {
                this.getListMembGroup(this.formGroup.value.group_id); // id grupo
                this.getListMemberSinGroup();
                this.calculaNMember();

              }
            }, () => { this.loading =false; }, () => { this.loading =false; });
          }
        });
      }
  }

}
