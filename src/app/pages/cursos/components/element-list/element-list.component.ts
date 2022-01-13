import { Component, Input, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.scss'],
})
export class ElementListComponent implements OnInit {
  @Input() sesion: any = [];
  @Input() unidad: any;
  elem: any;
  uniqueElements: any;

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.elementoSeleccionado();
    this.groupBy();
  }

  groupBy() {
    this.uniqueElements = this.sesion.elements.reduce((r: any, a: any) => {
      r[a.type_element_id] = [...(r[a.type_element_id] || []), a];
      return r;
    }, {});
    // console.log('elementos unicos desde list', this.uniqueElements);
  }

  elementoSeleccionado() {
    this.cursosService.elementEmitted$.subscribe((element) => {
      this.elem = element;
      // console.log('elemento seleccionado', this.elem);
    });
  }
}
