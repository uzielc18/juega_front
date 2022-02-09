import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DIRECTORY } from 'src/app/shared/directorios/directory';

@Component({
  selector: 'app-c-relation',
  templateUrl: './c-relation.component.html',
  styleUrls: ['./c-relation.component.scss']
})
export class CRelationComponent implements OnInit {
  @Input() item: any;
  directorio: any = DIRECTORY.base;
  arrayFile: any = [];
  formHeader: any = FormGroup;
  formHeaderFile: any = FormGroup;
  key_file: any;

  abecedario: any = [
         "a", "b", "c", "d",
    "e", "f", "g", "h", "i",
    "j", "k", "l", "m", "n",
    "o", "p", "q", "r", "s",
    "t", "u", "v", "w", "x",
    "y", "z"
  ];

  secondList: any[] = [];
  relationList: any[] = [
    {
      relacion: 'Lima',
      relacionImg: 'lima.jpg',
      resp: 'Peru',
      respImg: 'peru.jpg',
      puntos: 2,
      correcto: 0
    },
    {
      relacion: 'Quito',
      relacionImg: 'quito.jpg',
      resp: 'Ecuador',
      respImg: 'ecuador.jpg',
      puntos: 3,
      correcto: 0
    },
    {
      relacion: 'Montevideo',
      relacionImg: 'montevideo.jpg',
      resp: 'Uruguay',
      respImg: 'uruguay.jpg',
      puntos: 3,
      correcto: 0
    }
  ]

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fieldReactiveFile();
  }

  private fieldReactiveFile() {
    const controls = {
      file: ['', [Validators.required]],
    };
    this.formHeaderFile = this.formBuilder.group(controls);
    this.key_file = this.item?.id_carga_curso_docente + '_' + Math.floor(Math.random() * 90000) + 10000;
  }

  valueFile($event: any, item: any) {
    console.log($event);
    item.claveImg = $event.value.nombre_s3;
  }

  get validArray() {
    if (this.relationList.length > 0) {
      const array = this.relationList.filter(r => !r.relacion || !r.resp || r.puntos < 0 || r.puntos === null);
      if (array.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  addRelation() {
    const option = {
      relacion: '',
      relacionImg: '',
      resp: '',
      respImg: '',
      puntos: 0,
      correcto: 0
    }
    this.relationList.push(option);
  }

  cancel() {
    this.relationList = [];
  }

  saveRelation() {
    console.log(this.relationList);
    this.secondList = JSON.parse(JSON.stringify(this.relationList));
    this.secondList.forEach(object => {
      object.relacion = object.resp;
      object.relacionImg = object.respImg;
      delete object['resp'];
      delete object['respImg'];
    });
    console.log(this.secondList);
  }

  deleteRelation(i: any) {
    this.relationList.splice(i, 1);
    console.log(i);
    console.log(this.relationList, 'nuevo');
  }
}
