import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rubricas',
  templateUrl: './rubricas.component.html',
  styleUrls: ['./rubricas.component.scss']
})
export class RubricasComponent implements OnInit {
  listRubricas:any = [
    {
      nombre: 'Antecedentes (10)',
      excelente: 'Criterio 1',
      bueno: 'Criterio 1',
      regular: 'Criterio 1',
      deficiente: 'Criterio 1',
      value: '10-10',
      id:1
    },
    {
      nombre: 'Trabajo en equipo (5)',
      excelente: 'Criterio 4',
      bueno: 'Criterio 1',
      regular: 'Criterio 1',
      deficiente: 'Criterio 1',
      value: '5-0',
      id:2
    },
    {
      nombre: 'Antecedentes (10)',
      excelente: 'Criterio 7',
      bueno: 'Criterio 1',
      regular: 'Criterio 1',
      deficiente: 'Criterio 1',
      value: '5-1',
      id:3
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
