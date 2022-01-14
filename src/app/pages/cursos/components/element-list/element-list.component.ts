import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.scss'],
})
export class ElementListComponent implements OnInit {
  elem: any;
  subsElem!: Subscription;

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.elementoSeleccionado();
  }

  elementoSeleccionado() {
    this.subsElem = this.cursosService.elementEmitted$.subscribe((element) => {
      this.elem = element;
      console.log('elemento seleccionado --->', this.elem);
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.subsElem) {
      this.subsElem.unsubscribe();
    }
  }
}
