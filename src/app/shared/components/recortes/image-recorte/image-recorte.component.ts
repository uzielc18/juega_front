import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { S3ServiceService } from '../../prepare-file-pro/services/s3-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-recorte',
  templateUrl: './image-recorte.component.html',
  styleUrls: ['./image-recorte.component.scss']
})
export class ImageRecorteComponent implements OnInit, OnChanges {
  formHeaders: any = FormGroup;
  formFileHeaders: any = FormGroup;
  scale = 1;
  transform: ImageTransform = {};
  loading: boolean = false;
  @Output() resultFile: any = new EventEmitter<any>();
  @Input() paramsInfoFile: any;

  // @Input() resizeToWidth: any = 894;
  // @Input() cropperStaticWidth: any = 894;
  // @Input() cropperStaticHeight: any = 300;
  // @Input() resizeToHeight: any = 300;
  // @Input() aspectRatio: any = 15 / 4;
  @Input() aspectRatio: any = 4 / 1;
  @Input() heightImg: any = 300;
  @Input() widthImg: any = '';

  constructor(private formBuilder: FormBuilder, private s3ServiceServ: S3ServiceService) { }
  ngOnChanges():void {
    this.paramsInfoFile = this.paramsInfoFile;
  }

  ngOnInit(): void {
    this.prepareFile();
    this.formFiles();
  }
  private prepareFile() {
    const controls = {
      file: ['', [Validators.required]],
      name: ['', [Validators.required]],
      base64: ['', [Validators.required]],
      ext: [''],
      size: [''],
    };
    this.formHeaders = this.formBuilder.group(controls);
  }
  private formFiles() {
    const controls = {
      file: ['', [Validators.required]],
      name: ['', [Validators.required]],
      base64: ['', [Validators.required]],
      ext: [''],
      size: [''],
    };
    this.formFileHeaders = this.formBuilder.group(controls);
  }

  imgSize() {
    if (this.widthImg !== '') {
      return {
        'height': this.heightImg + 'px',
        'width': this.widthImg + 'px'
      }
    } else {
      return {
        // 'height': this.heightImg + 'px',
        'width': '100%'
      }
    }
  }

  onFileChange(event:any) {
    this.prepareFile();
    // this.urlSafe = '';
    if (this.isExistFiles(event)) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (eevent: any) => { // called once readAsDataURL is completed
        const url = eevent.target.result;
        this.formHeaders.controls['base64'].setValue(url);
      };
      const file = event.target.files[0];
      const sizeFile = event.target.files[0].size;
      this.formHeaders.get('file').setValue(file);
      const name = event.target.files[0].name;
      let re: any = /(?:\.([^.]+))?$/;
      const ext = re.exec(name)[1];
      this.formHeaders.controls['ext'].setValue(ext);
      this.formHeaders.controls['name'].setValue(name);
      this.formHeaders.controls['size'].setValue(sizeFile);
    }
  }
  private isExistFiles(event:any) {
    return event.target.files && (event.target.files.length > 0);
  }
  selectArchivo() {
    this.prepareFile();
    this.formFiles();
    this.resetImage();
    const opens:any = document.getElementById('adjunto');
    opens.click();
  }
  imageCropped(event: ImageCroppedEvent) {
    this.formFiles();
    this.formFileHeaders.controls['base64'].setValue(event.base64);
  }
  resetImage() {
    this.scale = 1;
    this.transform = {};
  }

  zoomOut() {
      this.scale -= .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
  }

  zoomIn() {
      this.scale += .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
  }
  procesCutFile() {
    let file = this.base64toFile(this.formFileHeaders.value.base64, this.formHeaders.value.name);
    if (file) {
      this.formFileHeaders.controls['file'].setValue(file);
      this.onFileNewCurt(file);
    } else {
      this.formFileHeaders.controls['file'].setValue('');
      this.formFileHeaders.controls['ext'].setValue('');
      this.formFileHeaders.controls['name'].setValue('');
      this.formFileHeaders.controls['size'].setValue('');
    }
    // console.log(this.formFileHeaders.value, 'ssssssssss', this.formHeaders.value);
    setTimeout(() => {
      this.anadirCutFile();
    }, 200);

  }
  base64toFile(dataurl: string, filename: string) {
    var arr:any = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  onFileNewCurt(event:any) {
    if (this.isExistCut(event)) {
      // const reader = new FileReader();
      // reader.readAsDataURL(event); // read file as data url
      // reader.onload = (eevent: any) => { // called once readAsDataURL is completed
      //   const url = eevent.target.result;
      //   this.formHeaders.controls['base64'].setValue(url);
      // };
      // const file = event;
      const sizeFile = event.size;
      // this.formHeaders.get('file').setValue(file);
      const name = event.name;
      let re: any = /(?:\.([^.]+))?$/;
      const ext = re.exec(name)[1];
      this.formFileHeaders.controls['ext'].setValue(ext);
      this.formFileHeaders.controls['name'].setValue(name);
      this.formFileHeaders.controls['size'].setValue(sizeFile);
    }
  }
  private isExistCut(event:any) {
    if (event) {
      return true;
    } else {
      return false;
    }
  }

  anadirCutFile() {
    const form = this.formFileHeaders.value;
    if (form && (form.size <= 26214400) ) { // 25MB
    const key = this.paramsInfoFile.key_file + '_' + Math.floor(1000 + Math.random() * 9000) + '.' + form.ext;
    const prams = {
      type: this.paramsInfoFile.type,
      directory: this.paramsInfoFile.directory,
      key: key,
    }
    // const parameter:any = {
    //   base64: form.base64,
    //   archivo: form.file,
    //   name: form.name,
    //   ext: form.ext,
    //   nombre: key,
    //   nombre_original: form.name,
    //   url: 'urls',
    //   peso: form.size,
    // };
    //   this.resultFile.emit(parameter);
    if (prams && prams.type && prams.directory && prams.key) {
      this.loading = true;
        this.s3ServiceServ.addFimadoS3$(prams).subscribe(r => {
          if (r.data.success) {
            const data = new FormData();
            data.append('file', form.file);
            const valore = data;
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
                };
                  this.resultFile.emit(parameter);
              }
            }, () => { this.loading = false }, () => { this.loading = false });
          }
        });
    }
  } else {
    Swal.fire({
      title: 'No permitido',
      text: ' El tamaño del archivo supera los ' + '24 mb',
      backdrop: true,
      icon: 'question',
      // animation: true,
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonColor: '#7f264a',
      confirmButtonText: 'Ok',
      // timer: 2000,
    });
  }
  }
}
