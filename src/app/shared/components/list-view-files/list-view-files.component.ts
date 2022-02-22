import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { MViewFilesComponent } from '../view-files/m-view-files/m-view-files.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-view-files',
  templateUrl: './list-view-files.component.html',
  styleUrls: ['./list-view-files.component.scss']
})
export class ListViewFilesComponent implements OnInit, OnChanges {
  @Input() title: any = 'Archivos adjuntos';
  @Input() typeView: any = 'MODAL'; // MODAL OR VIEW
  @Input() showText: boolean = true; // mostrar nombre del archivo
  @Input() arrayFiles: any = [];
  @Input() deleteFile: boolean = false;
  @Output() fileValue: EventEmitter<any> = new EventEmitter();
  @Output() deleteFileEmit: EventEmitter<any> = new EventEmitter();
  constructor(private dialogService: NbDialogService) { }

  ngOnChanges():void {
    this.arrayFiles = this.arrayFiles;
    this.recorrerList();
  }
  ngOnInit(): void {
  }

  recorrerList() {
    if (this.arrayFiles.length>0) {
      this.arrayFiles.map((r:any) => {
        r.name_corto = r.nombre_original.substr(0,7) + '...';
        r.icon = this.typeFileImg(r.ext);
      });
    }
  }
  typeFileImg(extension: string) {
    let icon = '';
    switch (extension) {
      case 'png':
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
      /// referencias, se abriran en otro enlace del navegador
      case 'YOUTUBE':
        icon = 'assets/icons_svg/youtube.svg';
        break;
      case 'SOUNDCLOUD':
        icon = 'assets/icons_svg/soundcloud.svg';
        break;
      case 'VIMEO':
        icon = 'assets/icons_svg/vimeo.svg';
        break;
      case 'REFERENCIA':
        icon = 'assets/icons_svg/referencia.svg';
      break;
      default:
        icon = 'assets/icons_svg/default.svg';
        break;
    }
    return icon;
  }
  valueFile(item:any) {
    this.recorrerSelected(item);
    // if (['YOUTUBE', 'SOUNDCLOUD', 'VIMEO', 'REFERENCIA'].includes(item.ext)) {

    //   this.fileValue.emit(item);

    // } else {

      if (this.typeView === 'MODAL') {
        if (item && item.nombre) {
          this.dialogService.open(MViewFilesComponent, {
            dialogClass: 'dialog-limited-height',
            context: {
              item: item,
            },
            closeOnBackdropClick: false,
            closeOnEsc: false
          }).onClose.subscribe(result => {
            if (result === 'ok') {
              // this.filtrar();
            }
          });
        }
      } else {
        this.fileValue.emit(item);
      }

    // }
  }
  recorrerSelected(item:any) {
    if (this.arrayFiles.length>0) {
      this.arrayFiles.map((r:any) => {
        r.color = '';
      });
      item.color = 'brown';
    }
  }
  valueDeleteFile(item:any) {
    if (item.id) {
    Swal.fire({
      title: 'Eliminar',
      text: '¿ Desea eliminar ' + item.nombre_original + ' ?',
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
          this.deleteFileEmit.emit(item);
      }
   });
  }
  }
}
