import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-created-poll',
  templateUrl: './created-poll.component.html',
  styleUrls: ['./created-poll.component.scss']
})
export class CreatedPollComponent implements OnInit {

  loading: boolean = false
  formHeader: any = FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      url: [''],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      publicar: [false],
      todos: [false],
      area: [''],
      mostrar_boton: [false],
      nombre_boton: [''],
      contenido: ['', [Validators.required]],
      tipo_filtro: ['', [Validators.required]],
      edad_desde: [''],
      edad_hasta: [''],
      imagen: ['', [Validators.required]],
      base64_url: ['', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
  }

}
