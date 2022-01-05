import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { S3ServiceService } from './services/s3-service.service';
import { UploadFileComponent } from './upload-file/upload-file.component';

@Component({
  selector: 'lamb-prepare-file-pro',
  templateUrl: './prepare-file-pro.component.html',
  styleUrls: ['./prepare-file-pro.component.scss'],
})
export class PrepareFileProComponent implements OnInit {
  userData: any;
  formHeaders: any = FormGroup;
  @Input() paramsInfo: any;
  @Input() typeFile: string = 'img-pdf'; // no modificar
  @Output() filterValueChange: any = new EventEmitter<any>();
  @Input() isDisabled: boolean = false; // no modificar
  @Input() numFiles: number = 10; // no modificar
  accept: any;
  listArrayFile: any = [];
  loading: boolean = false;
  constructor(private formBuilder: FormBuilder, private modalServiceNebular: NbDialogService,
    private s3ServiceServ: S3ServiceService) {

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
    };
    this.formHeaders = this.formBuilder.group(controls);
  }
  getUsers() {
    this.loading = true;
    this.s3ServiceServ.getUserMe().subscribe(res => {
      this.userData = res['data'];
      console.log(this.userData);

    }, () => { this.loading = false; }, () => { this.loading = false; });
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
        this.accept = '.xlsx, .xls, .csv';
        break;
      case 'doc':
        this.accept = '.doc, .docx';
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
      case 'zip':
        this.accept = '.zip, .rar, .7zip';
        break;
      case 'all':
        this.accept = 'image/png, image/jpg, image/jpeg, application/pdf, .doc, .docx,.xlsx, .xls, .csv, text/plain';
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
    this.onFilterChange();
  }

  openModal() {
    const param = {
      accepts: this.accept,
      params: {
        id: this.paramsInfo.id,
        codigoEst: this.userData.user && this.userData.user.person.codigo || '',
        codAleatory: Math.floor(Math.random() * 90000) + 10000,
        directory: this.paramsInfo.directory,
        type: this.paramsInfo.type,
      }
    }
    console.log(param);

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
        this.listArrayFile.push(datos);
        this.onFilterChange();
        this.limpiarFile();
      } else {
        this.limpiarFile();
      }
    });
  }
  onFilterChange() {
    const archivo = this.formHeaders.value;
    this.filterValueChange.emit({ value: archivo, arrayFile: this.listArrayFile });
  }
  deleteItem(i:any) {
    this.listArrayFile.splice(i, 1);
    this.onFilterChange();
  }
}
