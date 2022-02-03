import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss']
})
export class NavegacionComponent implements OnInit {

  items: NbMenuItem[] = [
    {
      title: 'Unidades',
      icon: 'undo-outline',
    },
    {
      title: 'I Primer titulo de la unidad',
      icon: 'pricetags-outline',
    },
    {
      title: 'II Segundo titulo de la unidad',
      icon: { icon: 'pricetags-outline', pack: 'eva' },
    },
    {
      title: 'III Tercer titulo de la unidad',
      icon: 'pricetags-outline',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
