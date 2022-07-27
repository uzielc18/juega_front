import {
  Component,
  OnInit,
} from '@angular/core';


@Component({
  selector: 'app-tabs-reporte-notas',
  templateUrl: './tabs-reporte-notas.component.html',
  styleUrls: ['./tabs-reporte-notas.component.scss']
})
export class TabsReporteNotasComponent implements OnInit {

  loading:boolean = false;

  constructor( ) { }

  ngOnInit(): void {
  }
}
