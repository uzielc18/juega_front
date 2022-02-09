import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-open',
  templateUrl: './c-open.component.html',
  styleUrls: ['./c-open.component.scss']
})
export class COpenComponent implements OnInit, OnChanges {
  @Input() headParams:any;
  arrayOpen:any = [
    {
        id: 0,
        question_id: 0,
        option: '',
        puntos: 0,
        correcto: 0,
        checked: false,
        orden: 1,
        estado: 1,
        imagen: '',
        base64: '',
    },
  ]
  constructor() { }
  ngOnChanges():void {
    this.headParams = this.headParams;
  }
  ngOnInit(): void {
  }
  get validButom() {
    if (this.arrayOpen.length>0) {
      const array = this.arrayOpen.filter((r:any) => !r.option || r.puntos < 0 || r.puntos === null || r.puntos === '');
      if (array.length>0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  saveQuestion() {

  }
}
