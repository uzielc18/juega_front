import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../../../providers';
import { END_POINTS } from '../../../../providers/utils';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  @Input() user: any;
  profile: any;

  view: string = 'mini';
  loading: boolean = false;
  formHeader: any = FormGroup;

  constructor(private formBuilder: FormBuilder, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fieldReactive();
  }

  private fieldReactive() {
    const controls = {
      codigo: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido_paterno: ['', [Validators.required]],
      apellido_materno: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      ubigeo: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      nacionalidad: ['', [Validators.required]],
      estado_civil: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.getUserInfo();
  }

  getUserInfo() {
    const serviceName = END_POINTS.base_back.user + '/perfil';
    const person_id = this.user.person_id;
    const user_id = this.user.user_id;
    const params = {
      view: this.view,
    };
    this.loading = true;
    this.generalService.nameIdAndIdParams$(serviceName, person_id, user_id, params).subscribe(
      (res: any) => {
        if (res.success) {
          this.profile = res.data;
          this.formHeader.patchValue({
            codigo: this.profile.person.codigo,
            nombre: this.profile.person.nombres,
            apellido_paterno: this.profile.person.apellido_paterno,
            apellido_materno: this.profile.person.apellido_materno,
            dni: this.profile.person.dni,
            correo: this.profile.user.email,
            genero: this.profile.person.genero || '',
            nacionalidad: this.profile.person.nacionalidad || '',
            ubigeo: this.profile.person.ubigeo || '',
            estado_civil: this.profile.person.estado_civil || '',
            religion: this.profile.person.religion || '',
            fecha_nacimiento: new Date(this.profile.person.fecha_nacimiento) || new Date(),
          });
        }
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  saveInfo() {
    const serviceName = END_POINTS.base_back.people;
    const person_id = this.user.person_id;
    this.loading = true;
    const data = {
      person: {
        genero: this.formHeader.controls['genero'].value,
        nacionalidad: this.formHeader.controls['nacionalidad'].value,
        ubigeo: this.formHeader.controls['ubigeo'].value,
        estado_civil: this.formHeader.controls['estado_civil'].value,
        religion: this.formHeader.controls['religion'].value,
        fecha_nacimiento: this.formHeader.controls['fecha_nacimiento'].value,
      },
      user: {
        email: this.formHeader.controls['correo'].value,
      },
    };
    this.generalService.updateNameIdData$(serviceName, person_id, data).subscribe(
      (res: any) => {
        if (res.success) {
          this.getUserInfo();
        }
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

}
