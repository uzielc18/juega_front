import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { MViewFilesComponent } from '../view-files/m-view-files/m-view-files.component';

@Component({
  selector: 'app-list-view-files',
  templateUrl: './list-view-files.component.html',
  styleUrls: ['./list-view-files.component.scss']
})
export class ListViewFilesComponent implements OnInit, OnChanges {
  @Input() title: any = 'Archivos adjuntos';
  @Input() typeView: any = 'MODAL'; // MODAL OR VIEW
  @Input() arrayFiles: any = [];
  @Output() fileValue: EventEmitter<any> = new EventEmitter();
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
      default:
        icon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Folder_open_alt_font_awesome.svg/512px-Folder_open_alt_font_awesome.svg.png';
        break;
    }
    return icon;
  }
  valueFile(item:any) {
    this.recorrerSelected(item);
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
  recorrerSelected(item:any) {
    if (this.arrayFiles.length>0) {
      this.arrayFiles.map((r:any) => {
        r.color = '';
      });
      item.color = 'brown';
    }
  }
}
