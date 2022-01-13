import { Component, Input, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.scss'],
})
export class ElementListComponent implements OnInit {
  elem: any;

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.elementoSeleccionado();
  }

  elementoSeleccionado() {
    this.cursosService.elementEmitted$.subscribe((element) => {
      this.elem = element;
      console.log('-------------', this.elem);
    });
  }
}
