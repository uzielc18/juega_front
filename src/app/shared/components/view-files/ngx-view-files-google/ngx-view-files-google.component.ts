import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-ngx-view-files-google',
  templateUrl: './ngx-view-files-google.component.html',
  styleUrls: ['./ngx-view-files-google.component.scss']
})
export class NgxViewFilesGoogleComponent implements OnInit, OnChanges {
  // Implement by Cristian
  @Output() loadingsFiles: EventEmitter<boolean> = new EventEmitter();
  doc: any = '';
  @Input() viewer: any = 'url'; // google, office, mammoth, pdf or url
  @Input() styleWidth: any = '100%';
  @Input() styleHeight: any = '50vh';
  @Input() valueFile: any = '';
  constructor(private generalServi: GeneralService) { }

  ngOnChanges():void {
    this.valueFile = this.valueFile;
    this.extensionFile();
  }
  ngOnInit(): void {

  }

  extensionFile() {
    const ext = this.valueFile.ext;
    switch (ext) {
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'pdf':
      case 'txt':
        this.viewer = 'url';
        break;
      case 'xls':
      case 'xlsx':
      case 'doc':
      case 'docx':
      case 'ppt':
      case 'pptx':
        this.viewer = 'office';
        break;
      // case 'txt':
      //   this.viewer = 'google';
      //   break;
      default:
        this.viewer = 'url';
        break;
    }
    if (this.viewer) {
      this.getFile();
    }
  }
  downloadFile() {
    const linkSource =  this.doc;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = this.valueFile.nombre;
    downloadLink.click();
  }
  refreshFile() {
    this.getFile();
  }
  getFile() {
    const params:any = {
      type: 'get',
      directory: 'plantillas/upeu',
      key: this.valueFile.nombre, // name s3
      // 127805_200110121_17603.pdf
    };
    const serviceName = END_POINTS.base_back.resourse + '/files-upload/get-signed-url';
    if (params && params.key) {
      this.loadingsFiles.emit(true);
      this.generalServi.nameParams$(serviceName, params).subscribe(r => {
        this.doc = r.data && r.data.url || '';
      }, () => { this.loadingsFiles.emit(false) }, () => { this.loadingsFiles.emit(false) });
    }
  }
}
