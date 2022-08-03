import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbDialogRef, NbDialogService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { MViewFilesComponent } from 'src/app/shared/components/view-files/m-view-files/m-view-files.component';
import { DIRECTORY } from 'src/app/shared/directorios/directory';
import { environment } from 'src/environments/environment';
import { MPortadaMiniaturaComponent } from '../m-portada-miniatura/m-portada-miniatura.component';

@Component({
  selector: 'app-m-course-free',
  templateUrl: './m-course-free.component.html',
  styleUrls: ['./m-course-free.component.scss']
})
export class MCourseFreeComponent implements OnInit {
  loading:boolean = false;
  formHeaderOne: any = FormGroup;
  formHeaderTo: any = FormGroup;
  formHeaderThree: any = FormGroup;
  @Input() userInfo:any;
  @Input() semestre:any;
  @Input() rolSemestre:any;

  @Input() items: any;
  @Input() code: any;
  key_file:any;
  directorioSilabo:any = DIRECTORY.courses + '/silabos';
  directorioGuiaEst:any = DIRECTORY.courses + '/guia-estudios';
  directorioPortadas:any = DIRECTORY.courses + '/portadas';

  typeCourse:any = [];
  litProgramStudy:any = [];
  idiomas: any = [
    {
      code: 'es',
      img: 'assets/spain.svg',
      name: 'Español',
      id: 1,
    },
    {
      code: 'en',
      img: 'assets/eeuu.svg',
      name: 'Inglés',
      id: 2,
    },
    {
      code: 'pb',
      img: 'assets/brasil.svg',
      name: 'Portugués',
      id: 3,
    },
  ];
  tipoNota = [
    {
      nombre: 'Cuantitativa',
      value: 'CUANTITATIVA',
    },
    {
      nombre: 'Cualitativa',
      value: 'CUALITATIVA',
    }
  ];
  ciclos = [{ciclo: '1'}, {ciclo:'2'}, {ciclo:'3'}, {ciclo:'4'}, {ciclo:'5'}, {ciclo:'6'}, {ciclo:'7'}, {ciclo:'8'}, {ciclo:'9'}, {ciclo:'10'}, {ciclo:'11'}, {ciclo:'12'}, {ciclo:'13'}, {ciclo:'14'}];
  filteredOptions$:any = [];
  min: any = Date;
  cambios = 0;

  constructor(public activeModal: NbDialogRef<MCourseFreeComponent>, private service: GeneralService, private formBuilder: FormBuilder, private datePipe: DatePipe,
    private dialogService: NbDialogService, dateService: NbDateService<Date>) {
      let date:any = Date;
      date = dateService.today();
      this.min = dateService.addDay(date, -1);
    }

  ngOnInit(): void {
    this.fieldReactiveOne();
    this.gettypeCourse();
    this.getProgramStudy();
    this.fieldReactiveTo();
    this.fieldReactiveThree();
    if (this.code === 'UPDATE') {
      this.setUpdate();
    }
  }
  private fieldReactiveOne() {
    const controls = {
      id_curso: [''],
      id_carga_curso_docente: [''],
      id_tipo_curso: ['', [Validators.required]],
      id_programa_estudio: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      id_docente: ['', [Validators.required]],
      nombre_docente: ['', [Validators.required]],
      horas_semana: ['', [Validators.required]],
      id_idioma: ['', [Validators.required]],
      ciclo: ['', [Validators.required]],
      cupos: ['', [Validators.required]],
      aula: ['', [Validators.required]],
      grupo: ['unico', [Validators.required]],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      tipo_nota: ['CUANTITATIVA', [Validators.required]],
      nota_min: [''],
      nota_max: [''],
      descripcion: ['', [Validators.required]],
      estado: ['2'],  // 2 = no publicar, 1 = publicar
    };
    this.formHeaderOne = this.formBuilder.group(controls);
    this.changeTipoNota(this.formHeaderOne.value.tipo_nota);
  }
  private fieldReactiveTo() {
    const controls = {
      inscripcion: [false],
      consultas: [false],
      pago: [false],
      chat: [false],
      fecha_inicio_inscr: [''],
      fecha_fin_inscr: [''],
      url_inscripcion: [''],
      clave_inscripcion: [''],
      precio_local: [''],
      precio_dolares: [''],
      porcentaje_descuento: [''],
      file_silabo: ['', [Validators.required]],
      file_guia_curso: ['', [Validators.required]],
      url_video_intro: ['', [Validators.required, Validators.maxLength(255)]],
      file_portada: ['', [Validators.required]],
      file_portada_url_base64: ['', [Validators.required]],
      file_miniatura: ['', [Validators.required]],
      file_miniatura_url_base64: ['', [Validators.required]],
    };
    this.formHeaderTo = this.formBuilder.group(controls);
  }
  private fieldReactiveThree() {
    const controls = {
      publicar: [false],
    };
    this.formHeaderThree = this.formBuilder.group(controls);
  }
  closeModal() {
    if (this.cambios === 0 ) {
      this.activeModal.close('close');
    }else {
      this.activeModal.close('ok');
    }
  }
  gettypeCourse() {
    const serviceName = 'coursesTypes';
    this.service.nameAll$(serviceName).subscribe(res => {
      this.typeCourse = res.data || [];
    })
  }
  getProgramStudy() {
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
    if(this.rolSemestre.area.area_id === 0 && this.code === 'UPDATE'){
       idArea = this.items.area_id;
    }else{
      idArea = this.rolSemestre.area.area_id;
    }
    if (ids && ids.sede_id && ids.nivel_ensenanza_id) {
      this.service.nameIdAndIdAndIdParams$(serviceName, ids.nivel_ensenanza_id, ids.sede_id, idArea, params).subscribe((res:any) => {
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
  }
  inputKeyAutocomplete($event:any) {
    if (!this.formHeaderOne.value.nombre_docente) {
      this.formHeaderOne.controls['id_docente'].setValue('');
      this.filteredOptions$ = [];
    }
    if ($event && $event.target && $event.target.value && $event.target.value.length>=3) {
        this.filteredOptions$ = [];
        let serviceName = 'search-teach-student';
        const params = {
          datos: $event.target.value,
        };
        this.service.nameParams$(serviceName, params).subscribe((res:any) => {
          this.filteredOptions$ = res.data || [];
        });
      }
  }
  changeAutocomplete($event:any) {
    if ($event && $event.id) {
      this.formHeaderOne.controls['id_docente'].setValue($event.id);
      this.filteredOptions$ = this.filteredOptions$.filter((a:any) => a.id === $event.id);
    } else {
      this.formHeaderOne.controls['id_docente'].setValue('');
      this.formHeaderOne.controls['nombre_docente'].setValue('');
    }
  }
  colorAutocompleteSelect(option:any) {
    if (this.formHeaderOne.value.id_docente === option.id) {
      return {'background': 'var(--color-primary-500)', 'color': 'white', 'font-size': '11px'};
    } else {
      return {'font-size': '11px'};
    }
  }
  changeTipoNota($event:any) {
    this.formHeaderOne.controls['nota_min'].setValue('');
    this.formHeaderOne.controls['nota_max'].setValue('');
    if ($event === 'CUANTITATIVA') {
      this.formHeaderOne.controls['nota_min'].setValidators([Validators.required]);
      this.formHeaderOne.controls['nota_min'].updateValueAndValidity();

      this.formHeaderOne.controls['nota_max'].setValidators([Validators.required]);
      this.formHeaderOne.controls['nota_max'].updateValueAndValidity();
    } else {
      this.formHeaderOne.controls['nota_min'].setValidators([]);
      this.formHeaderOne.controls['nota_min'].updateValueAndValidity();

      this.formHeaderOne.controls['nota_max'].setValidators([]);
      this.formHeaderOne.controls['nota_max'].updateValueAndValidity();
    }
  }
  changeSteps($event:any) {
    // console.log($event, 'stepers');

  }
  nextPasoOne(nbStepperNext:any, one:any) {
    const serviceName = 'courses';
    const forms = this.formHeaderOne.value;
    const smedeAreaId = this.litProgramStudy.find((re:any) => re.id === Number(forms.id_programa_estudio));
    const params = {
      programa_estudio_id: forms.id_programa_estudio,
      semester_id : this.semestre.id,
      sede_area_id: smedeAreaId?.sede_area_id,
      courses_type_id: forms.id_tipo_curso,
      persons_teacher_id: forms.id_docente,
      nombre: forms.nombre,
      descripcion: forms.descripcion,
      ciclo: forms.ciclo,
      cupos: forms.cupos,
      grupo: forms.grupo,
      aula: forms.aula,
      fecha_inicio: this.datePipe.transform(forms.fecha_inicio, 'yyyy-MM-dd'),
      fecha_fin: this.datePipe.transform(forms.fecha_fin, 'yyyy-MM-dd'),
      tipo_nota: forms.tipo_nota,
      min_nota: forms.nota_min,
      max_nota: forms.nota_max,
      ht: forms.horas_semana,
      idioma: forms.id_idioma,
      estado: forms.estado,
    }
    if (this.formHeaderOne.valid && !forms.id_curso) {
      this.loading = true;
      this.service.addNameData$(serviceName, params).subscribe((res:any) => {
        if (res.success) {
          // console.log(res);

          this.formHeaderOne.controls['id_curso'].setValue(res.data.id);
          this.formHeaderOne.controls['id_carga_curso_docente'].setValue(res.data.id_carga_curso_docente);
          this.formHeaderThree.controls['publicar'].setValue(this.formHeaderOne.value.estado === '1'  ? true : false);
          this.cambios = this.cambios+1;
           nbStepperNext.next();
        }
      }, () => {this.loading = false;}, () => {this.loading = false;});
    }
    if (this.formHeaderOne.valid &&forms.id_curso) {
      this.loading = true;
      this.service.updateNameIdData$(serviceName, forms.id_curso, params).subscribe((res:any) => {
        if (res.success) {
          this.cambios = this.cambios+1;
          nbStepperNext.next();
        }
      }, () => {this.loading = false;}, () => {this.loading = false;});
    }
  }

  toggleChangeInscr($event:any) {
    this.formHeaderTo.controls['fecha_inicio_inscr'].setValue('');
    this.formHeaderTo.controls['fecha_fin_inscr'].setValue('');
    this.formHeaderTo.controls['url_inscripcion'].setValue('');
    this.formHeaderTo.controls['clave_inscripcion'].setValue('');
    if ($event) {

      const ruta = environment.learning + '/v/' + this.formHeaderOne.value.id_carga_curso_docente + '/' + this.quitarAcentoAndSignosToTexto('Curso de comunicación integral en la niñes, conciente de SÚs altecados.');

      this.formHeaderTo.controls['fecha_inicio_inscr'].setValidators([Validators.required]);
      this.formHeaderTo.controls['fecha_inicio_inscr'].updateValueAndValidity();

      this.formHeaderTo.controls['fecha_fin_inscr'].setValidators([Validators.required]);
      this.formHeaderTo.controls['fecha_fin_inscr'].updateValueAndValidity();

      this.formHeaderTo.controls['url_inscripcion'].setValidators([Validators.required]);
      this.formHeaderTo.controls['url_inscripcion'].updateValueAndValidity();
      this.formHeaderTo.controls['url_inscripcion'].setValue(ruta);

      this.formHeaderTo.controls['clave_inscripcion'].setValidators([Validators.required, Validators.maxLength(4)]);
      this.formHeaderTo.controls['clave_inscripcion'].updateValueAndValidity();
    } else {
      this.formHeaderTo.controls['fecha_inicio_inscr'].setValidators([]);
      this.formHeaderTo.controls['fecha_inicio_inscr'].updateValueAndValidity();

      this.formHeaderTo.controls['fecha_fin_inscr'].setValidators([]);
      this.formHeaderTo.controls['fecha_fin_inscr'].updateValueAndValidity();

      this.formHeaderTo.controls['url_inscripcion'].setValidators([]);
      this.formHeaderTo.controls['url_inscripcion'].updateValueAndValidity();

      this.formHeaderTo.controls['clave_inscripcion'].setValidators([]);
      this.formHeaderTo.controls['clave_inscripcion'].updateValueAndValidity();
    }
  }
  quitarAcentoAndSignosToTexto(valuee:any) {
    let newText = valuee;
    const specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
    for (var i = 0; i < specialChars.length; i++) { // quitar signos
      newText= newText.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    }
    let text = newText.toLowerCase();
    const acentos:any = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','ñ':'n','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U','Ñ':'N'};
    const array = text.split('');
    const textoPre = array.map((letra:any) => acentos[letra] || letra).join('').toString(); // quitar acentos
    const arrayPre = textoPre.split(' ');
    const textFin = arrayPre.join('-');
    return textFin;
  }
  toggleChangePago($event:any) {
    this.formHeaderTo.controls['precio_local'].setValue('');
    this.formHeaderTo.controls['precio_dolares'].setValue('');
    this.formHeaderTo.controls['porcentaje_descuento'].setValue('');
    if ($event) {
      this.formHeaderTo.controls['precio_local'].setValidators([Validators.required]);
      this.formHeaderTo.controls['precio_local'].updateValueAndValidity();

      this.formHeaderTo.controls['precio_dolares'].setValidators([Validators.required]);
      this.formHeaderTo.controls['precio_dolares'].updateValueAndValidity();

      this.formHeaderTo.controls['porcentaje_descuento'].setValidators([Validators.required]);
      this.formHeaderTo.controls['porcentaje_descuento'].updateValueAndValidity();
    } else {
      this.formHeaderTo.controls['precio_local'].setValidators([]);
      this.formHeaderTo.controls['precio_local'].updateValueAndValidity();

      this.formHeaderTo.controls['precio_dolares'].setValidators([]);
      this.formHeaderTo.controls['precio_dolares'].updateValueAndValidity();

      this.formHeaderTo.controls['porcentaje_descuento'].setValidators([]);
      this.formHeaderTo.controls['porcentaje_descuento'].updateValueAndValidity();
    }
  }
  backPasoTo(nbStepperNext:any, to:any) {
    nbStepperNext.previous();
  }
  nextPasoTo(nbStepperNext:any, to:any) {
    const serviceName = 'courses';
    const forms = this.formHeaderTo.value;
    const params = {
      inscripcion: forms.inscripcion === true ? 'SI' : 'NO',
      consultas: forms.consultas  === true ? '1' : '0',
      pago: forms.pago === true ? 'SI' : 'NO',
      chat: forms.chat === true ? '1' : '0',
      fecha_inicio_inscripcion: this.datePipe.transform(forms.fecha_inicio_inscr, 'yyyy-MM-dd'),
      fecha_fin_inscripcion: this.datePipe.transform(forms.fecha_fin_inscr, 'yyyy-MM-dd'),
      url_compartir: forms.url_inscripcion,
      clave_inscripcion: forms.clave_inscripcion,
      precio: forms.precio_local,
      precio2: forms.precio_dolares,
      descuento: forms.porcentaje_descuento,
      silabo: forms.file_silabo,
      guia_curso: forms.file_guia_curso,
      url_video: forms.url_video_intro,
      portada: forms.file_portada,
      portada_miniatura: forms.file_miniatura,
    }
    if (this.formHeaderTo.valid && this.formHeaderOne.value.id_curso) {
      this.loading = true;
      this.service.updateNameIdData$(serviceName, this.formHeaderOne.value.id_curso, params).subscribe((res:any) => {
        if (res.success) {
          this.cambios = this.cambios+1;
          nbStepperNext.next();
        }
      }, () => {this.loading = false;}, () => {this.loading = false;});
    }
    // console.log(nbStepperNext, 'ehhhhhh=======> ', to, 'values', params);

  }
  valueFileSilabo($event:any) {
    // console.log($event);

    this.formHeaderTo.controls['file_silabo'].setValue('');
    if ($event) {
      this.formHeaderTo.controls['file_silabo'].setValue($event.value.nombre_s3);
    }
  }
  valueFileGuiaEstudio($event:any) {
    // console.log($event);
    this.formHeaderTo.controls['file_guia_curso'].setValue('');
    if ($event) {
      this.formHeaderTo.controls['file_guia_curso'].setValue($event.value.nombre_s3);
    }
  }
  clearFileSilabo() {
    this.formHeaderTo.controls['file_silabo'].setValue('');
  }
  clearFileGuia() {
    this.formHeaderTo.controls['file_guia_curso'].setValue('');
  }
  clearFilePortada() {
    this.formHeaderTo.controls['file_portada'].setValue('');
  }
  clearFileMiniatura() {
    this.formHeaderTo.controls['file_miniatura'].setValue('');
  }
  keyFile() {
    if (this.formHeaderOne.value.id_carga_curso_docente) {
      this.key_file = this.userInfo?.person?.codigo + '-' + this.formHeaderOne.value.id_carga_curso_docente;
      return this.key_file;
    } else {
      this.key_file = this.userInfo?.person?.codigo;
      return this.key_file;
    }
  }
  openRecortePortadaMin(type:any) {
    this.dialogService.open(MPortadaMiniaturaComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        keyFile: this.keyFile(),
        directori: this.directorioPortadas,
        aspect: type === 'miniatura' ? (4 / 2) : (4 / 1),
        // userInfo: this.appUserInfo.user,

      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result && result.close === 'ok') {
        // console.log(result, 'eeeeeeeeeeeee');
        if (type === 'portada') {
          this.formHeaderTo.controls['file_portada'].setValue('');
          this.formHeaderTo.controls['file_portada_url_base64'].setValue('');
          if (result && result.value) {
            this.formHeaderTo.controls['file_portada'].setValue(result.value.nombre);
            this.formHeaderTo.controls['file_portada_url_base64'].setValue(result.value.base64);
          }
        }

        if (type === 'miniatura') {
          this.formHeaderTo.controls['file_miniatura'].setValue('');
          this.formHeaderTo.controls['file_miniatura_url_base64'].setValue('');
          if (result && result.value) {
            this.formHeaderTo.controls['file_miniatura'].setValue(result.value.nombre);
            this.formHeaderTo.controls['file_miniatura_url_base64'].setValue(result.value.base64);
          }
        }
      }
    });
  }
  backPasoThree(nbStepperNext:any, three:any) {
    nbStepperNext.previous();
  }
  nextPasoThree(nbStepperNext:any, three:any) {
    const serviceName = 'courses';
    const forms = this.formHeaderThree.value;
    const params = {
      estado: forms.publicar === true ? '1' : '2', // 2 = no publicar, 1 = publicar
    }
    if (this.formHeaderOne.value.id_curso) {
      this.loading = true;
      this.service.updateNameIdData$(serviceName,this.formHeaderOne.value.id_curso, params).subscribe((res:any) => {
        if (res.success) {
          this.cambios = this.cambios+1;
          nbStepperNext.next();
        }
      }, () => {this.loading = false;}, () => {this.loading = false;});
    }
    // console.log(nbStepperNext, 'ehhhhhh=======> ', three, 'values', params);
  }
  backPasoFinish(nbStepperNext:any, finish:any) {
    nbStepperNext.previous();
  }
  nextPasoFinish(nbStepperNext:any, finish:any) {
    nbStepperNext.reset();
    this.fieldReactiveOne();
    this.fieldReactiveTo();
    this.fieldReactiveThree();
  }
  setUpdate() {
    this.formHeaderOne.patchValue({
      id_curso: this.items.id,
      id_carga_curso_docente: this.items.id_carga_curso_docente,
      id_tipo_curso: this.items.courses_type_id,
      id_programa_estudio: this.items.programa_estudio_id,
      nombre: this.items.nombre,
      id_docente: this.items.persons_teacher_id,
      nombre_docente: this.items.persons_teacher_nombre,
      horas_semana: this.items.ht,
      id_idioma: this.items.idioma,
      ciclo: this.items.ciclo,
      cupos: this.items.cupos,
      aula: this.items.aula,
      grupo: this.items.grupo,
      fecha_inicio: this.renderDate(this.items.fecha_inicio),
      fecha_fin: this.renderDate(this.items.fecha_fin),
      tipo_nota: this.items.tipo_nota,
      nota_min: this.items.min_nota,
      nota_max: this.items.max_nota,
      descripcion: this.items.descripcion,
      estado: this.items.estado,
    });
    this.changeTipoNota(this.formHeaderOne.value.tipo_nota);
    this.formHeaderOne.patchValue({
      nota_min: this.items.min_nota,
      nota_max: this.items.max_nota,
    });

    this.formHeaderTo.patchValue({
      inscripcion: this.items.inscripcion === 'SI' ? true : false,
      consultas: this.items.consultas === '1' ? true : false,
      pago: this.items.pago === 'SI' ? true : false,
      chat: this.items.chat === '1' ? true : false,
      file_silabo: this.items.silabo,
      file_guia_curso: this.items.guia_curso,
      url_video_intro: this.items.url_video,
      file_portada: this.items.portada,
      file_miniatura: this.items.portada_miniatura,
    });
    this.getFile(this.items.portada, 'P');
    this.getFile(this.items.portada_miniatura, 'M');

    this.toggleChangeInscr(this.formHeaderTo.value.inscripcion);
    this.formHeaderTo.patchValue({
      fecha_inicio_inscr: this.renderDate(this.items.fecha_inicio_inscripcion),
      fecha_fin_inscr: this.renderDate(this.items.fecha_fin_inscripcion),
      url_inscripcion: this.items.url_compartir,
      clave_inscripcion: this.items.clave_inscripcion,
    });

    this.toggleChangePago(this.formHeaderTo.value.pago);
    this.formHeaderTo.patchValue({
      precio_local: this.items.precio,
      precio_dolares: this.items.precio2,
      porcentaje_descuento: this.items.descuento,
    });

    this.formHeaderThree.patchValue({
      publicar: this.items.estado === '1' ? true : false,
    });
  }
  renderDate(date: any) {
    if (date) {
      const fecha = date.split('-');
      var n = new Date(`${fecha[0]}-${fecha[1]}-${fecha[2]}`);
      n.setMinutes(n.getMinutes() + n.getTimezoneOffset()); //para solucionar la diferencia de minutos
      if (n.getDate()) {
        return n;
      } else {
        return '';
      }
    }
    return '';
  }
  getFile(name:any, es:any) {
    this.formHeaderTo.controls['file_portada_url_base64'].setValue('');
    this.formHeaderTo.controls['file_miniatura_url_base64'].setValue('');
    const params:any = {
      type: 'get',
      directory: this.directorioPortadas,
      key: name,
    };
    const serviceName = END_POINTS.base_back.resourse + '/files-upload/get-signed-url';
    if (params && params.key) {
      this.service.nameParams$(serviceName, params).subscribe(r => {
        if (r && r.data && r.data.success) {
          if (es === 'P') {
            this.formHeaderTo.controls['file_portada_url_base64'].setValue(r.data.url);
          }
          if (es === 'M') {
            this.formHeaderTo.controls['file_miniatura_url_base64'].setValue(r.data.url);
          }
        }
      }, () => {  }, () => {  });
    }
  }
  viewFileDoc(name:any, directory:any) {
    const valor = name;
    const partir = valor.split('.');
    const items = {
      ext: partir[1],
      nombre: name
    }
    this.dialogService.open(MViewFilesComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        item: items,
        director: directory,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        // this.filtrar();
      }
    });
  }
}
