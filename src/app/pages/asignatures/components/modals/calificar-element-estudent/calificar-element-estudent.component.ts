import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';

@Component({
  selector: 'app-calificar-element-estudent',
  templateUrl: './calificar-element-estudent.component.html',
  styleUrls: ['./calificar-element-estudent.component.scss']
})
export class CalificarElementEstudentComponent implements OnInit {
  loading:boolean = false;
  @Input() element:any;
  listAlumns:any = [
    {
      nombre: 'Cristian Huarcaya Quilla'
    },
    {
      nombre: 'Anfres Carlos Slamatea'
    },
    {
      nombre: 'Godofredo Empatico en tutados'
    }
  ];
  constructor(public activeModal: NbDialogRef<CalificarElementEstudentComponent>, private formBuilder: FormBuilder, private generalServi: GeneralService) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.activeModal.close('close');
}
}
