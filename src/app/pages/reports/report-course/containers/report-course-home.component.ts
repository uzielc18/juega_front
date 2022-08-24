import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-report-course-home',
  templateUrl: './report-course-home.component.html',
  styleUrls: ['./report-course-home.component.scss']
})
export class ReportCourseHomeComponent implements OnInit {

  loading: boolean = false;
  formHeader: any = FormGroup;
  ciclos: any = [{ciclo: '1'}, {ciclo:'2'}, {ciclo:'3'}, {ciclo:'4'}, {ciclo:'5'}, {ciclo:'6'}, {ciclo:'7'}, {ciclo:'8'}, {ciclo:'9'}, {ciclo:'10'}, {ciclo:'11'}, {ciclo:'12'}, {ciclo:'13'}, {ciclo:'14'}];
  estados: any[] = [
    {nombre: 'Calificados', value: 'CA'},
    {nombre: 'Sin calificar', value: 'SC'},
    {nombre: 'Próximos', value: 'PX'},
    {nombre: 'Re-Apertura', value: 'RA'},
    //{nombre: 'Vencidos', value: 'V'}
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fieldReactive();
  }

  private fieldReactive() {
    const controls = {
      facultades_unidades: [''],
      programa_estudio_id: [''],
      ciclo: [''],
      id_estado: ['']
    };
    this.formHeader = this.fb.group(controls);
  }
}
