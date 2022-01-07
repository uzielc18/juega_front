import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.cursosService.getCursos().subscribe();
  }

  // prueba(event: any) {
  //   console.log('desdeee main', event);
  // }
}
