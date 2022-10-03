import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NbDialogRef } from '@nebular/theme';
import { S3ServiceService } from '../services/s3-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'lamb-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  urlSafe: SafeResourceUrl = '';
  formHeaders: any = FormGroup;
  @Input() accepts: any;
  @Input() params: any;
  loading: boolean = false;
  constructor(public activeModal: NbDialogRef<UploadFileComponent>, public sanitizer: DomSanitizer, private formBuilder: FormBuilder,
    private s3ServiceServ: S3ServiceService) { }

  ngOnInit(): void {
    // console.log(this.params);

    this.formularioFiels();
  }
  private formularioFiels() {
    const controls = {
      file: ['', [Validators.required]],
      name: ['', [Validators.required]],
      base64: ['', [Validators.required]],
      ext: [''],
      size: [''],
    };
    this.formHeaders = this.formBuilder.group(controls);
    this.loading = true;
    setTimeout(() => {
      this.selectArchivo();
      this.loading = false;
    }, 100)
  }

  closeModal() {
    this.limpiarDatos();
    const file = {
      close: 'close',
    };
    this.activeModal.close(file);
  }
  private isExistFiles(event:any) {
    return event.target.files && (event.target.files.length > 0);
  }
  /// imagen
  onFileChange(event:any) {
    this.limpiarDatos();
    this.urlSafe = '';
    if (this.isExistFiles(event)) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (eevent: any) => { // called once readAsDataURL is completed
        const url = eevent.target.result;
        this.formHeaders.controls['base64'].setValue(url);
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);

      };
      const file = event.target.files[0];
      const sizeFile = event.target.files[0].size;
      // const fileExtension = file.type.split('/').pop();
      // this.formHeaders.controls['ext'].setValue(fileExtension);
      this.formHeaders.get('file').setValue(file);
      const name = event.target.files[0].name;
      let re: any = /(?:\.([^.]+))?$/;
      const ext = re.exec(name)[1];
      this.formHeaders.controls['ext'].setValue(ext);
      this.formHeaders.controls['name'].setValue(name);
      this.formHeaders.controls['size'].setValue(sizeFile);
    }
  }
  limpiarDatos() {
    this.formHeaders.patchValue({
      file: '',
      name: '',
      base64: '',
      ext: '',
      size: '',
    });
  }
  selectArchivo() {
    const opens:any = document.getElementById('adjunto');
    opens.click();
  }
  anadirFile() {
    const form = this.formHeaders.value;
    //if (form && (form.size <= 26214400) ) { // 25MB
    const key = this.params.key_file + '_' + Math.floor(1000 + Math.random() * 9000) + '.' + form.ext;
    const prams = {
      type: this.params.type,
      directory: this.params.directory,
      key: key,
      id_carga_curso_docente_array: this.params?.id_carga_curso_docente_array
    }
    console.log(prams, "paramsssssss")
    if (prams && prams.type && prams.directory && prams.key) {
      this.loading = true;
        this.s3ServiceServ.addFimadoS3$(prams).subscribe(r => {
          if (r.data.success) {
            const data = new FormData();
            data.append('file', form.file);
            const valore = data;
            //const u = r.data.url.split('?');

            if( this.params?.id_carga_curso_docente_array !== '0'){
              const arr: any = []
              r.data.url.forEach((f: any) => {
                const u = f.split('?');
                const urls = u[0];
                this.s3ServiceServ.addS3$(f, form.file.type, form.file).subscribe(r => {
                  if (r.status === 200) {

                    const parameter:any = {
                      base64: form.base64,
                      archivo: form.file,
                      name: form.name,
                      ext: form.ext,
                      nombre: key,
                      nombre_original: form.name,
                      url: urls,
                      peso: form.size,
                      close: 'save',
                    };
                    arr.push(parameter);


                    this.activeModal.close(arr);
                  }
                }, () => { this.loading = false }, () => { this.loading = false });
              })
            }
            if(this.params?.id_carga_curso_docente_array === '0'){
              console.log(r.data)
              const u = r.data.url.split('?');
              const urls = u[0];
              this.s3ServiceServ.addS3$(r.data.url, form.file.type, form.file).subscribe(r => {

                if (r.status === 200) {
                  const parameter:any = {
                    base64: form.base64,
                    archivo: form.file,
                    name: form.name,
                    ext: form.ext,
                    nombre: key,
                    nombre_original: form.name,
                    url: urls,
                    peso: form.size,
                    close: 'save',
                  };
                  this.activeModal.close(parameter);
                }
              }, () => { this.loading = false }, () => { this.loading = false });
            }
          }
        }, () => { this.loading = false }, () => { this.loading = false });
    }
    // }
   // else {
    //Swal.fire({
      // title: 'No permitido',
      // text: ' El tamaño del archivo supera los ' + '24 mb',
      // backdrop: true,
      // icon: 'question',
      // animation: true,
      // showCloseButton: true,
      // showCancelButton: false,
      //  showConfirmButton: true,
      //  confirmButtonColor: '#7f264a',
      //   confirmButtonText: 'Ok',
      //    // timer: 2000,
      //   });
    // }
  }
  fileImg(extension: string) {
    let icon = '';
    switch (extension) {
      case 'png':
      case 'PNG':
      case 'jpg':
      case 'jpeg':
        icon = 'assets/icons_svg/png.svg';
        break;
      case 'doc':
      case 'docx':
        icon = 'assets/icons_svg/dox.svg';
        break;
      case 'ppt':
      case 'pptx':
        icon = 'assets/icons_svg/ppt.svg';
        break;
      case 'xls':
      case 'xlsx':
        icon = 'assets/icons_svg/xls.svg';
        break;
      case 'pdf':
        icon = 'assets/icons_svg/pdf.svg';
        break;
      case 'txt':
        icon = 'assets/icons_svg/txt.svg';
        break;
      default:
        icon = 'assets/icons_svg/default.svg';
        break;
    }
    return icon;
  }
}
