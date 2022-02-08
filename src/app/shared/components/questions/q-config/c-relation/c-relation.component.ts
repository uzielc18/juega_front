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

  relationList: any[] = [
    {
      clave: 'Lima',
      claveImg: 'lima.jpg',
      resp: 'Peru',
      respImg: 'peru.jpg',
      puntos: 2
    },
    {
      clave: 'Quito',
      claveImg: 'quito.jpg',
      resp: 'Ecuador',
      respImg: 'ecuador.jpg',
      puntos: 3
    },
    {
      clave: 'Montevideo',
      claveImg: 'montevideo.jpg',
      resp: 'Uruguay',
      respImg: 'uruguay.jpg',
      puntos: 3
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
  }

  valueFile($event: any, item: any) {
    console.log($event);
    item.claveImg = $event

    if ($event && $event.value) {
      this.formHeaderFile.controls['file'].setValue($event.value);
    } else {
      this.formHeaderFile.controls['file'].setValue('');
    }
  }

  get validArray() {
    if (this.relationList.length > 0) {
      const array = this.relationList.filter(r => !r.clave || !r.resp || r.puntos < 0 || r.puntos === '' || r.puntos === undefined || r.puntos === null);
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
      clave: '',
      claveImg: '',
      resp: '',
      respImg: '',
      puntos: 0
    }
    this.relationList.push(option);
  }

  cancel() {
    this.relationList = [];
  }

  saveRelation() {
    console.log(this.relationList);
  }

  deleteRelation(i: any) {
    this.relationList.splice(i, 1);
    console.log(i);
    console.log(this.relationList, 'nuevo');
  }
}
