import {Component, Input, isDevMode, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {DomSanitizer} from "@angular/platform-browser";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {S3ServiceService} from "../../prepare-file-pro/services/s3-service.service";
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import uniqueBy from "@popperjs/core/lib/utils/uniqueBy";
import Swal from "sweetalert2";

@Component({
  selector: 'app-ngx-upload-file',
  templateUrl: './ngx-upload-file.component.html',
  styleUrls: ['./ngx-upload-file.component.scss']
})
export class NgxUploadFileComponent implements OnInit {
  public files: any[] = [];
  formHeaders: any = FormGroup;
  png = '.png'
  @Input() accepts: any;
  @Input() params: any;
  loading: boolean = false;
  constructor(public activeModal: NbDialogRef<NgxUploadFileComponent>, public sanitizer: DomSanitizer, private formBuilder: FormBuilder,
              private s3ServiceServ: S3ServiceService) { }

  ngOnInit(): void {
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
      this.loading = false;
    }, 100)
  }

  closeModal(){
    this.activeModal.close('')
  }


  public dropped(files: NgxFileDropEntry[]) {

    for (const droppedFile of files) {
      // Is it a file and is it allowed?
      if (droppedFile.fileEntry.isFile && this.isFileAllowed(droppedFile.fileEntry?.name)) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        let ar: any = []

        fileEntry?.file((file: File) => {
         console.log(droppedFile.relativePath, file);
         const a = file
          ar.push(a)

        });
       console.log(ar, "holaaa")
        files.forEach((f: any) => {

        })
        this.files.push()
        console.log(this.files)
        const hash: any = {}
        this.files = this.files.filter((current: any) => {
          const exists = !hash[current.relativePath];
          hash[current.relativePath] = true;
          return exists;
        })
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Formato no permitido',
          backdrop: true,
          icon: 'error',
          // animation: true,
          showCloseButton: true,
          showConfirmButton: true,
          confirmButtonColor: '#00244E',
          confirmButtonText: 'OK',
          // timer: 2000,
        }).then((result:any) => {
          if (result.isConfirmed) {

          }
        });
      }
    }
  }

  isFileAllowed(fileName: string) {

    console.log(fileName, 'file name')
    let isFileAllowed = false;
    const allowedFiles = this.accepts;
    console.log(allowedFiles, "allowed")
    const regex = /(?:\.([^.]+))?$/;
    const extension = regex.exec(fileName);
    if (isDevMode()) {
      //console.log('extension du fichier : ', extension);
    }
    if (undefined !== extension && null !== extension) {
      for (const ext of allowedFiles) {
        if (ext === extension[0]) {
          isFileAllowed = true;
        }
      }
    }
    return isFileAllowed;
  }

  public fileOver(event: any){
    //console.log(event);
  }

  public fileLeave(event: any){
    //console.log(event);
  }

  deleteItem(index: any){
    this.files.splice(index, 1)
  }
  fileImg(extension: any) {
    const regex = /(?:\.([^.]+))?$/;
    const extensions: any = regex.exec(extension?.fileEntry?.name);
    let icon = '';
    switch (extensions[0]) {
      case '.png':
      case '.PNG':
      case '.jpg':
      case '.jpeg':
        icon = 'assets/icons_svg/png.svg';
        break;
      case '.doc':
      case '.docx':
        icon = 'assets/icons_svg/dox.svg';
        break;
      case '.ppt':
      case '.pptx':
        icon = 'assets/icons_svg/ppt.svg';
        break;
      case '.xls':
      case '.xlsx':
        icon = 'assets/icons_svg/xls.svg';
        break;
      case '.pdf':
        icon = 'assets/icons_svg/pdf.svg';
        break;
      case '.txt':
        icon = 'assets/icons_svg/txt.svg';
        break;
      default:
        icon = 'assets/icons_svg/default.svg';
        break;
    }
    return icon;
  }
}
