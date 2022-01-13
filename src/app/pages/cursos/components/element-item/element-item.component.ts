import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-element-item',
  templateUrl: './element-item.component.html',
  styleUrls: ['./element-item.component.scss'],
})
export class ElementItemComponent implements OnInit {
  @Input() element: any;
  @Input() elem: any;
  elementSelected: any;

  constructor() {}

  ngOnInit(): void {
    this.getElementByType('TRABAJO');
    // this.getElementByType(this.elem.type_element.nombre);
  }

  getElementByType(type: any) {
    this.elementSelected = this.element.value.filter(
      (element: any) => element.type_element.nombre === type
    );
    console.log(this.elementSelected, 'seleccionado');
  }
}
