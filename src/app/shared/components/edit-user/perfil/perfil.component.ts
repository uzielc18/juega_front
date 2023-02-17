import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../../../providers';
import { END_POINTS } from '../../../../providers/utils';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  @Input() user: any;
  @Input() rol: any
  profile: any;

  generoArray: any[] = ['Masculino', 'Femenino'];
  estadoCivilArray: any[] = [
    'Casado(a)',
    'Soltero(a)',
    'Divorciado(a)',
    'Viudo(a)',
    'Separado(a)',
    'Conviviente',
    'No precisa',
  ];
  categoryTeachers: any = [] = [
    {
      id: 1,
      name: 'AUXILIAR'
    },
    {
      id: 2,
      name: 'ASOCIADO'
    },
    {
      id: 3,
      name: 'PRINCIPAL'
    },
  ]
  religionArray: any[] = [
    'Adventista del Séptimo Día',
    'Católico',
    'Evangélico',
    'Mormón',
    'Pentecostes',
    'Testigo de Jehova',
    'Otro',
    'Ninguno',
  ];

  view: string = 'mini';
  loading: boolean = false;
  formHeader: any = FormGroup;
  facultades: any = [];
  litProgramStudy:any = [];

  constructor(private formBuilder: FormBuilder, private generalService: GeneralService) {}

  ngOnInit(): void {
    this.fieldReactive();
  }

  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    const val = JSON.parse(sesion);
    if (val && val.rol){
      return val;
    } else {
      return '';
    }
  }
  private fieldReactive() {
    const controls = {
      codigo: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido_paterno: ['', [Validators.required]],
      apellido_materno: ['', [Validators.required]],
      dni: ['', [Validators.required]],/*
      facultades_unidades: ['', [Validators.required]],
      id_programa_estudio: ['', [Validators.required]],*/
      ubigeo: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      nacionalidad: ['', [Validators.required]],
      estado_civil: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      id_canva: ['']
    };
    this.formHeader = this.formBuilder.group(controls);
    this.getUserInfo();
    this.getFacultadesUnidades();
  }

  getUserInfo() {
    const serviceName = END_POINTS.base_back.user + '/perfil';
    let person_id: any = '';
    let user_id: any = '';

    if(this.rol === 'user'){
        person_id = this.user?.person?.id;
        user_id = this.user?.user?.id;
    }else{
       person_id = this.user.person_id;
       user_id = this.user.user_id;
    }
    const params = {
      view: this.view,
    };
    this.loading = true;
    this.generalService.nameIdAndIdParams$(serviceName, person_id, user_id, params).subscribe(
      (res: any) => {
        if (res.success) {
          this.profile = res.data;
          this.formHeader.patchValue({
            codigo: this.profile.person.codigo,
            nombre: this.profile.person.nombres,
            apellido_paterno: this.profile.person.apellido_paterno,
            apellido_materno: this.profile.person.apellido_materno,
            dni: this.profile.person.dni,
            correo: this.profile.user.email,
            genero: this.profile.person.genero || '',
            nacionalidad: this.profile.person.nacionalidad || '',
            ubigeo: this.profile.person.ubigeo || '',
            estado_civil: this.profile.person.estado_civil || '',
            religion: this.profile.person.religion || '',
            fecha_nacimiento: new Date(this.profile.person.fecha_nacimiento) || new Date(),
           /* id_programa_estudio: this.profile.person.programa_estudio_id,*/
            id_canva: this.profile.person.id_canva
          });
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
/*  selectCategory(item: any){
    this.formHeader.controls['categoria_docente'].setValue(item.name);
  }*/
  saveInfo() {
    const serviceName = END_POINTS.base_back.people;
    let person_id: any;
    if(this.rol === 'user'){
      person_id = this.user?.person?.id
    }else {
      person_id = this.user.person_id;
    }

    this.loading = true;
    const data = {
      person: {
        genero: this.formHeader.controls['genero'].value || '',
        nacionalidad: this.formHeader.controls['nacionalidad'].value || '',
        ubigeo: this.formHeader.controls['ubigeo'].value || '',
        estado_civil: this.formHeader.controls['estado_civil'].value || '',
        religion: this.formHeader.controls['religion'].value || '',
        fecha_nacimiento: this.formHeader.controls['fecha_nacimiento'].value || '',
        id_canva: this.formHeader.controls['id_canva'].value || ''
      },
      user: {
        email: this.formHeader.controls['correo'].value || '',
      },
      persons_teacher: {
      },
    };
    this.generalService.updateNameIdData$(serviceName, person_id, data).subscribe(
      (res: any) => {
        if (res.success) {
          this.getUserInfo();
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
  syncLamb() {
    const serviceName = END_POINTS.base_back.config + '/get-info-user';
    // const person_id = this.userInfo._user.id;
    const user = this.user.usuario_upeu;
    this.loading = true;
    this.generalService.nameParams$(serviceName, {user: user}).subscribe(
      (res: any) => {
        if (res.success) {
          this.getUserInfo();
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
  getFacultadesUnidades(){
    const serviceName = END_POINTS.base_back.sede_areas;
    const params = {
      all: 1
    }
    this.generalService.nameIdAndIdParams$(serviceName, this.rolSemestre.area.nivel_ensenanza_id, this.rolSemestre.area.sede_id, params).subscribe(
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
  selecFacultades(item: any){
    this.formHeader.controls['facultades_unidades'].setValue(item.id);
    this.litProgramStudy = [];
    this.formHeader.controls['id_programa_estudio'].setValue('');
    this.listProgramEstudy(item.nivel_ensenanza_id, this.rolSemestre.area.sede_id, item.id)
  }
  listProgramEstudy( id_nive_enseanza:any, id_sede:any, id_area:any){
    this.loading = true
    const serviceName = 'list-programa-estudios';
    const params = {
      programa_estudio_id: this.rolSemestre.area.programa_estudio_id,
    }
    if (id_sede && id_nive_enseanza) {
      this.generalService.nameIdAndIdAndIdParams$(serviceName, id_nive_enseanza, id_sede, id_area, params).subscribe((res:any) => {
        this.litProgramStudy = res.data || [];
        //console.log(this.litProgramStudy)
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
  /*getProgramStudy() {
    const serviceName = 'list-programa-estudios';
    let idArea:any;
    const ids = {
      nivel_ensenanza_id: this.rolSemestre.area.nivel_ensenanza_id,
      sede_id: this.rolSemestre.area.sede_id,
      area_id: this.rolSemestre.area.area_id,
    };
    const params = {
      programa_estudio_id: this.rolSemestre.area.programa_estudio_id,
    }
    if(this.rolSemestre.area.area_id === 0 ){
      idArea = this.items.area_id;
    }else{
      idArea = this.rolSemestre.area.area_id;
    }
    if (ids && ids.sede_id && ids.nivel_ensenanza_id) {
      this.generalService.nameIdAndIdAndIdParams$(serviceName, ids.nivel_ensenanza_id, ids.sede_id, idArea, params).subscribe((res:any) => {
        this.litProgramStudy = res.data || [];
        if (this.litProgramStudy.length>0) {
          this.litProgramStudy.map((r:any) => {
            r.name_programa_estudio = r.nombre_corto + ' - ' + (r.sede_nombre ? r.sede_nombre : '');
            if (r.semiprecencial_nombre) {
              r.name_programa_estudio = r.nombre_corto + ' (' + r.sede_nombre + ' - ' + r.semiprecencial_nombre + ' )';
            }
          })
          // this.getZoom();
        }
      });
    }
  }*/


}
