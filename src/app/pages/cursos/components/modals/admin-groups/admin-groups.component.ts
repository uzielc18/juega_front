import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html',
  styleUrls: ['./admin-groups.component.scss']
})
export class AdminGroupsComponent implements OnInit {
  formGroupManual: any = FormGroup;
  formGenerar: any = FormGroup;
  formImportar: any = FormGroup;
  @Input() item: any;
  @Input() code: any;
  @Input() curso:any;
  loading: boolean = false;
  listMiembros:any = [
    {
      nombre: 'Crsitian Huarcaya Quilla',
      id: 1,
    },
    {
      nombre: 'Carlos Calderón Huarcaya',
      id: 2,
    },
    {
      nombre: 'Juan Peréz Huarcaya',
      id: 3,
    },
    {
      nombre: 'Felipe peso Lucas',
      id: 4,
    },
    {
      nombre: 'Sebastian rodriguez jaimes Acaya',
      id: 5,
    },
    {
      nombre: 'Gonzalo Higuain Huarcaya',
      id: 6,
    },
    {
      nombre: 'Edmundo Caracagno Huarcaya',
      id: 7,
    },
    {
      nombre: 'Eusebio Goñi Huarcaya',
      id: 8,
    },
    {
      nombre: 'Teofilo Cubillas Saavedra Huarcaya',
      id: 9,
    },
  ];
  arregloDeArreglos:any = [];
  datosGrup: any = {
    g_completos: 0,
    g_imcompletos: 0,
    n_imc: 0,
  };
  listGroups:any = [];
  type: any;
  alumnsPending: any = [
    {
      nombre: 'Crsitian Huarcaya Quilla',
      id: 1,
    },
    {
      nombre: 'Carlos Calderón Huarcaya',
      id: 2,
    },
    {
      nombre: 'Juan Peréz Huarcaya',
      id: 3,
    },
    {
      nombre: 'Felipe peso Lucas',
      id: 4,
    },
    {
      nombre: 'Sebastian rodriguez jaimes Acaya',
      id: 5,
    },
    {
      nombre: 'Gonzalo Higuain Huarcaya',
      id: 6,
    },
    {
      nombre: 'Edmundo Caracagno Huarcaya',
      id: 7,
    },
    {
      nombre: 'Eusebio Goñi Huarcaya',
      id: 8,
    },
    {
      nombre: 'Teofilo Cubillas Saavedra Huarcaya',
      id: 9,
    },
  ];
  partidos:any = {

  }
  constructor(public activeModal: NbDialogRef<AdminGroupsComponent>, private formBuilder: FormBuilder, private generalServi: GeneralService,
    private dialogService: NbDialogService) { }

  ngOnInit(): void {
    console.log(this.curso);

    this.fieldGrupManual();
    this.fieldGenerar();
    this.fieldImportar();
    this.partirArrayPending();
  }
  private fieldGrupManual() {
    const controls = {
      nombre_grupo: ['', [Validators.required]],
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
      id_trabajo: ['', [Validators.required]],
    };
    this.formImportar = this.formBuilder.group(controls);
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
        break;
      case 'I': //Importar
      this.type = idTab;
        break;
      default:
        this.type = '';
        break;
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
    console.log("Arreglo de arreglos: ", this.arregloDeArreglos);
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

  partirArrayPending() {
    // this.partidos = {
    //   array_A: [],
    //   array_B: [],
    // }
    // if (this.alumnsPending.length > 0) {

    //   values.array_A = this.alumnsPending.splice(0,(this.alumnsPending.length/2));

    //   console.log("Mitad 1 --> ",values.array_A);

    //   values.array_B = this.alumnsPending.splice(0,this.alumnsPending.length);
    //   console.log("Mitad 2 -->",values.array_B);


    // }
    // console.log(values);

    // return values;
  }

  save() {
    const serviceName = '';
    let params:any = '';

    if (this.type === 'GM') {
      params = {
        nombre_grupo: this.formGroupManual.value.nombre_grupo,
        type: this.type,
      }
    }
    if (this.type === 'G') {
      params = {
        array: this.arregloDeArreglos,
        type: this.type,
      }
    }
    if (this.type === 'I') {
      params = {
        id_trabajo: this.formImportar.value.id_trabajo,
        type: this.type,
      }
    }
      // this.loading = true;
      // this.generalServi.addNameData$(serviceName, params).subscribe(r => {
      //   if (r.success) {
      //   }
      // }, () => { this.loading =false; }, () => { this.loading =false; });
    console.log(params);

  }

}
