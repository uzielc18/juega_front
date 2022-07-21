import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs-reporte-notas',
  templateUrl: './tabs-reporte-notas.component.html',
  styleUrls: ['./tabs-reporte-notas.component.scss']
})
export class TabsReporteNotasComponent implements OnInit {

  loading:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  imprSelect():void{
    let printContent:any = document.getElementById('print');
    let printContent2:any = document.getElementById('print2');
    const WindowPrt: any = window.open(' ', '_blank' );
    WindowPrt.document.write(printContent.innerHTML, printContent2.innerHTML);
    WindowPrt.document.close();
    WindowPrt.print( );
    WindowPrt.close();
  }
}
