import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss'],
})
export class CursoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

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

  selectedItem = '0';
}
