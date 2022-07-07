import { Component, Input, OnInit } from '@angular/core';
import {DIRECTORY} from "../../../../../../shared/directorios/directory";
@Component({
  selector: 'app-v-document',
  templateUrl: './v-document.component.html',
  styleUrls: ['./v-document.component.scss']
})
export class VDocumentComponent implements OnInit {
  @Input() element: any;
  @Input() userInfo: any;
  directorio: any = DIRECTORY.courses;
  constructor(
  ) { }

  ngOnInit(): void {
  }

  getDirectoy() {
    if (this.element && this.element?.id_carga_curso_docente) {
      return this.directorio + '/' + this.element?.id_carga_curso_docente + '/documents';
    } else {
      return '';
    }
  }
}
