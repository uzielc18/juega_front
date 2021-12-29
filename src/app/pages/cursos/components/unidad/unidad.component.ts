import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.scss'],
})
export class UnidadComponent implements OnInit {
  @Input() unidades: any = [];
  // sesiones: any = this.unidades.topics;
  // unidades = this.sesiones.units;

  constructor() {}

  ngOnInit(): void {}
}
