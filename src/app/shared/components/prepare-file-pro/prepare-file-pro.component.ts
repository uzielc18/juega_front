import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { AppService } from 'src/app/core';
import { UploadFileComponent } from './upload-file/upload-file.component';

@Component({
  selector: 'lamb-prepare-file-pro',
  templateUrl: './prepare-file-pro.component.html',
  styleUrls: ['./prepare-file-pro.component.scss'],
})
export class PrepareFileProComponent implements OnInit, OnChanges {
  userData: any;
  formHeaders: any = FormGroup;
  @Input() paramsInfo: any;
  @Input() typeFile: string = 'all'; // no modificar
  @Output() filterValueChange: any = new EventEmitter<any>();
  @Input() isDisabled: boolean = false; // no modificar
  @Input() numFiles: number = 10; // no modificar
  accept: any;
  @Input() listArrayFile: any = [];
  loading: boolean = false;
  @Input() viewFile: string = 'ARRAY';
  @Input() fullWidth: boolean = true;
  constructor(private formBuilder: FormBuilder, private modalServiceNebular: NbDialogService,
    private appService: AppService) {
  }
  ngOnChanges():void {
    this.listArrayFile = this.listArrayFile;
    this.isDisabled = this.isDisabled;
    this.paramsInfo = this.paramsInfo;
  }
  ngOnInit(): void {
    this.getUsers();
    this.formularioFiels();
    this.typeFileSet(this.typeFile);
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
  typeFileSet(typeFile: string) {
    // Create by Cristian
    switch (typeFile) {
      case 'img':
        this.accept = 'image/png, image/jpg, image/jpeg';
        break;
      case 'pdf':
        this.accept = 'application/pdf';
        break;
      case 'excel':
        this.accept = '.xlsx, .xls';
        break;
      case 'doc':
        this.accept = '.doc, .docx, .ppt, .pptx';
        break;
      case 'txt':
        this.accept = 'text/plain';
        break;
      case 'img-pdf':
        this.accept = 'image/png, image/jpg, image/jpeg, application/pdf';
        break;
      case 'audio':
        this.accept = 'audio/mp3';
        break;
      case 'all':
        this.accept = 'image/png, image/jpg, image/jpeg, application/pdf, .doc, .docx, .ppt, .pptx, .xlsx, .xls, text/plain';
        break;
      case 'audio-img':
          this.accept = 'audio/mp3, audio/m4a, image/png, image/jpg, image/jpeg';
         break;
      default:
        this.accept = 'image/png, image/jpg, image/jpeg, application/pdf';
        break;
    }
  }
  limpiarFile() {
    this.formHeaders.controls['file_archivo'].setValue('');
    this.formHeaders.controls['name_file'].setValue('');
    this.formHeaders.controls['ext_file'].setValue('');
    this.formHeaders.controls['base64'].setValue('');
    this.formHeaders.controls['nombre_s3'].setValue('');
    // this.onFilterChange();
  }

  openModal() {
    const param = {
      accepts: this.accept,
      params: {
        key_file: this.paramsInfo.key_file,
        // id: this.paramsInfo.id,
        // codigoEst: this.userData.user && this.userData.user.person.codigo || '',
        // codAleatory: Math.floor(Math.random() * 90000) + 10000,
        directory: this.paramsInfo.directory,
        type: this.paramsInfo.type,
      }
    }
    this.modalServiceNebular.open(UploadFileComponent, {
      closeOnBackdropClick: false,
      context: param,
      closeOnEsc: false,
      autoFocus: true,
    }).onClose.subscribe(result => {
      if (result && result.close === 'save') {
        this.formHeaders.controls['file_archivo'].setValue(result.archivo);
        this.formHeaders.controls['name_file'].setValue(result.name);
        this.formHeaders.controls['ext_file'].setValue(result.ext);
        this.formHeaders.controls['base64'].setValue(result.base64);
        this.formHeaders.controls['nombre_s3'].setValue(result.nombre);
        const datos = {
          ext: result.ext,
          nombre: result.nombre,
          nombre_original: result.nombre_original,
          url: result.url,
          peso: result.peso,
          tipo: this.paramsInfo.tipo || '',
          person_id: this.userData.user.id,
          tabla: this.paramsInfo.tabla,
          tabla_id: '',
        }
        if (this.viewFile === 'ARRAY') {
          this.listArrayFile.push(datos);
        }
        this.onFilterChange();
        setTimeout(() => {
          this.limpiarFile();
        }, 1000);
      } else {
        this.limpiarFile();
      }
    });
  }
  onFilterChange() {
    const archivo = this.formHeaders.value;
    if (this.viewFile === 'ARRAY') {
      this.filterValueChange.emit({ value: archivo, arrayFile: this.listArrayFile });
    }
    if (this.viewFile === 'UNIQUE') {
      this.filterValueChange.emit({ value: archivo, arrayFile: [] });
    }
  }
  deleteItem(i:any) {
    this.listArrayFile.splice(i, 1);
    this.onFilterChange();
  }
}
