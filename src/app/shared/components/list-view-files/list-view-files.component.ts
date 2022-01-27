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
        icon = 'https://www.shareicon.net/data/2017/03/02/880210_images_512x512.png';
        break;
      case 'doc':
      case 'docx':
        icon = 'https://www.vhv.rs/dpng/d/109-1098204_microsoft-word-icon-microsoft-word-logo-white-hd.png';
        break;
      case 'ppt':
      case 'pptx':
        icon = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhvJL7KzXqNt1n3vN89njhjHieCjeovxQkG9CUuNMCp_QP8veIhDtpuktr6HmNUS0n4KY&usqp=CAU';
        break;
      case 'xls':
      case 'xlsx':
        icon = 'https://www.pinclipart.com/picdir/middle/317-3177716_excel-comments-import-excel-icon-png-clipart.png';
        break;
      case 'pdf':
        icon = 'http://www.lgrrabogados.com/images/icono-pdf.png';
        break;
      case 'txt':
        icon = 'https://cdn-icons-png.flaticon.com/512/104/104647.png';
        break;
      /// referencias, se abriran en otro enlace del navegador
      case 'YOUTUBE':
        icon = 'http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c500.png';
        break;
      case 'SOUNDCLOUD':
        icon = 'https://cdn-icons-png.flaticon.com/512/51/51992.png';
        break;
      case 'VIMEO':
        icon = 'https://e7.pngegg.com/pngimages/499/302/png-clipart-social-media-computer-icons-vimeo-social-media-text-heart.png';
        break;
      case 'REFERENCIA':
        icon = 'https://static.thenounproject.com/png/2472697-200.png';
      break;
      default:
        icon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Folder_open_alt_font_awesome.svg/512px-Folder_open_alt_font_awesome.svg.png';
        break;
    }
    return icon;
  }
  valueFile(item:any) {
    this.recorrerSelected(item);
    if (['YOUTUBE', 'SOUNDCLOUD', 'VIMEO', 'REFERENCIA'].includes(item.ext)) {

        window.open(item.url, '_blank');

    } else {

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

    }
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
