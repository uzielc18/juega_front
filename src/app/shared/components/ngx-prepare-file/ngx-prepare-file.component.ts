import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UploadFileComponent} from "../prepare-file-pro/upload-file/upload-file.component";
import {NbDialogService} from "@nebular/theme";
import {AppService} from "../../../core";
import {NgxUploadFileComponent} from "./upload-file/ngx-upload-file.component";

@Component({
  selector: 'lamb-ngx-prepare-file',
  templateUrl: './ngx-prepare-file.component.html',
  styleUrls: ['./ngx-prepare-file.component.scss']
})
export class NgxPrepareFileComponent implements OnInit, OnChanges {

  userData: any;
  accept: any;
  @Input() paramsInfo: any;
  @Input() typeFile: string = 'all'; // no modificar
  @Output() filterValueChange: any = new EventEmitter<any>();
  @Input() isDisabled: boolean = false; // no modificar
  @Input() numFiles: number = 10; // no modificar
  @Input() listArrayFile: any = [];
  @Input() validBtn: any;
  loading: boolean = false;
  @Input() viewFile: string = 'ARRAY';
  @Input() fullWidth: boolean = true;
  @Input() colorButom: any = 'basic';
  formHeaders: any = FormGroup;
  constructor(private formBuilder: FormBuilder, private modalServiceNebular: NbDialogService,
              private appService: AppService) { }

  ngOnChanges():void {
    this.listArrayFile = this.listArrayFile;
    this.isDisabled = this.isDisabled;
    this.paramsInfo = this.paramsInfo;
    this.colorButom = this.colorButom;
  }
  ngOnInit(): void {
    this.getUsers();
    this.formularioFiels();
    this.typeFileSetNgx(this.typeFile);
  }
  private formularioFiels(): any {
    const controls = {
      file_archivo: [''],
      name_file: [''],
      ext_file: [''],
      base64: [''],
      nombre_s3: ['']
    };
    this.formHeaders = this.formBuilder.group(controls);
  }
  getUsers() {
    this.userData = this.appService;
  }

  typeFileSetNgx(typeFile: string) {
    switch (typeFile) {
      case 'img':
        this.accept = ['.png', '.jpg', '.jpeg'];
        break;
      case 'pdf':
        this.accept = ['.pdf'];
        break;
      case 'excel':
        this.accept = ['.xlsx', '.xls'];
        break;
      case 'doc':
        this.accept = ['.doc', '.docx', '.ppt', '.pptx',];
        break;
      case 'txt':
        this.accept = ['.plain'];
        break;
      case 'img-pdf':
        this.accept = ['.png', '.jpg', '.jpeg', '.pdf'];
        break;
      case 'audio':
        this.accept = ['.mp3'];
        break;
      case 'all':
        this.accept = ['.png', '.jpg','JPG', '.jpeg', '.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xlsx', '.xls', '.plain'];
        break;
      case 'audio-img':
        this.accept = ['.mp3', '.m4a', '.png', '.jpg', '.jpeg'];
        break;
      default:
        this.accept = ['.png', '.jpg', '.jpeg', '.pdf'];
        break;
    }
  }
  openModal(){
    const param = {
      accepts: this.accept,
      params: {
        key_file: this.paramsInfo.key_file,
        // id: this.paramsInfo.id,
        // codigoEst: this.userData.user && this.userData.user.person.codigo || '',
        // codAleatory: Math.floor(Math.random() * 90000) + 10000,
        directory: this.paramsInfo.directory,
        type: this.paramsInfo.type,
        id_carga_curso_docente_array: this.paramsInfo.id_carga_curso_docente_array?.join(',') || '0'
      }

    }
    this.modalServiceNebular.open(NgxUploadFileComponent, {
      closeOnBackdropClick: false,
      context: param,
      closeOnEsc: false,
      autoFocus: true,
    }).onClose.subscribe(result => {
      if (result && (result[0]?.close || result.close) === 'save') {
        this.formHeaders.controls['file_archivo'].setValue(result[0]?.archivo || result.archivo);
        this.formHeaders.controls['name_file'].setValue(result[0]?.name || result.name);
        this.formHeaders.controls['ext_file'].setValue(result[0]?.ext || result.ext);
        this.formHeaders.controls['base64'].setValue(result[0]?.base64 || result.base64);
        this.formHeaders.controls['nombre_s3'].setValue(result[0]?.nombre || result.nombre);
        const datos = {
          ext: result[0]?.ext || result.ext,
          nombre: result[0]?.nombre || result.nombre,
          nombre_original: result[0]?.nombre_original || result.nombre_original,
          url: result[0]?.url || result.url,
          peso: result[0]?.peso || result.peso,
          tipo: this.paramsInfo.tipo || '',
          person_id: this.userData.user?.person.id,
          tabla: this.paramsInfo.tabla,
          tabla_id: '',
        }
        if (this.viewFile === 'ARRAY') {
          this.listArrayFile.push(datos);
        }
       // this.onFilterChange();
        setTimeout(() => {
          //this.limpiarFile();
        }, 1000);
      } else {
        //this.limpiarFile();
      }
    });
  }
}
