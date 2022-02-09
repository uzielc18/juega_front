import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DIRECTORY } from 'src/app/shared/directorios/directory';

@Component({
  selector: 'app-c-true-false',
  templateUrl: './c-true-false.component.html',
  styleUrls: ['./c-true-false.component.scss']
})
export class CTrueFalseComponent implements OnInit, OnChanges {
  @Input() headParams:any;
  arrayTrueFalse:any = [
    {
      nombre: 'VERDADERO',
      puntos: 0,
      checked: false,
      base64: '',
      img_s3: '',
      color: 'rgb(155, 247, 151)',
      value: 'V',
    },
    {
      nombre: 'FALSO',
      puntos: 0,
      checked: false,
      base64: '',
      img_s3: '',
      color: 'rgb(248, 193, 176)',
      value: 'F',
    }
  ];
  key_file:any;
  directorio = DIRECTORY.base;
  constructor() { }
  ngOnChanges():void {
    this.headParams = this.headParams;
  }
  ngOnInit(): void {
    this.valueKey();
  }
  valueKey() {
    this.key_file = 'ssss' + '_' + '00000000001' + '_' + Math.floor(Math.random() * 90000) + 10000;
  }

  valueFile($event: any, item:any) {
    item.img_s3 = $event.value.nombre_s3;
    item.base64 = $event.value.base64;
  }

  saveQuestion() {
    console.log(this.arrayTrueFalse);
  }
  deleteItemFile(item:any) {
    item.base64 = '';
  }
  get validButom() {
    if (this.arrayTrueFalse.length>0) {
      const array = this.arrayTrueFalse.filter((r:any) => !r.nombre || r.puntos < 0 || r.puntos === null || r.puntos === '');
      if (array.length>0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  valueChange(item:any) {

    this.arrayTrueFalse.map((res:any) => {
      res.checked = false;
    });
    item.checked = true;
  }
}
