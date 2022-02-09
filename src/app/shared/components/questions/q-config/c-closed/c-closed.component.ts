import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-c-closed',
  templateUrl: './c-closed.component.html',
  styleUrls: ['./c-closed.component.scss']
})
export class CClosedComponent implements OnInit, OnChanges {
  @Input() headParams:any;
  arrayClose:any = [
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
    if (this.arrayClose.length>0) {
      const array = this.arrayClose.filter((r:any) => !r.option || r.puntos < 0 || r.puntos === null || r.puntos === '');
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