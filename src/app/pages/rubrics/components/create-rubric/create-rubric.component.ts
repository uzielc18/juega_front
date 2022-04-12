import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-create-rubric',
  templateUrl: './create-rubric.component.html',
  styleUrls: ['./create-rubric.component.scss'],
})
export class CreateRubricComponent implements OnInit {
  rubrica: any = {
    nombre: 'Rubrica sssssssssss',
    descripcion: 'aaaaaaaa',
    num_criterios: 2,
    num_niveles: 2,
    criterios: [
      {
        titulo: 'Criterio 1',
        descripcion: 'ssssss',
        puntuacion: 5,
        niveles: [
          {
            descripcion: 'qwww',
            puntuacion: 5,
          },
          {
            descripcion: 'wwwee',
            puntuacion: 3,
          },
        ],
      },
      {
        titulo: 'Criterio 2',
        descripcion: 'aaaaaaa',
        puntuacion: 10,
        niveles: [
          {
            descripcion: 'eeer',
            puntuacion: 10,
          },
          {
            descripcion: 'rrrrt',
            puntuacion: 5,
          },
        ],
      },
    ],
  };

  loading: boolean = false;
  userForm: any = FormGroup;
  @Input() rubric: any;

  colors: any[] = ['#57884e', '#8ba642', '#f9c851', '#f9a65a', '#f97a5a', '#f94a5a', '#f9065a'];

  constructor(public activeModal: NbDialogRef<CreateRubricComponent>, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
      num_criterios: [4, [Validators.required, Validators.min(1), Validators.max(7)]],
      num_niveles: [4, [Validators.required, Validators.min(1)]],
      criterios: this.fb.array([this.addCriterioGroup()]),
    });
    this.addCriterios();

    this.userForm.get('num_criterios').valueChanges.subscribe((value: any) => {
      if (this.userForm.get('num_criterios').value > 0) {
        this.addCriterios();
      }
    });
    this.userForm.get('num_niveles').valueChanges.subscribe((value: any) => {
      if (this.userForm.get('num_niveles').value > 0 && this.userForm.get('num_niveles').value <= 7) {
        this.addCriterios();
      }
    });
  }

  ngOnInit(): void {
    // this.userForm.patchValue(this.rubrica);
  }

  closeModal() {
    this.activeModal.close('close');
  }

  upNumCriterio() {
    if (this.userForm.get('num_criterios').value >= 0) {
      this.userForm.get('num_criterios').setValue(this.userForm.get('num_criterios').value + 1);
    }
  }

  downNumCriterio() {
    if (this.userForm.get('num_criterios').value > 1) {
      this.userForm.get('num_criterios').setValue(this.userForm.get('num_criterios').value - 1);
    }
  }

  upNumNivel() {
    if (this.userForm.get('num_niveles').value >= 0 && this.userForm.get('num_niveles').value < 7) {
      this.userForm.get('num_niveles').setValue(this.userForm.get('num_niveles').value + 1);
    }
  }

  downNumNivel() {
    if (this.userForm.get('num_niveles').value > 1) {
      this.userForm.get('num_niveles').setValue(this.userForm.get('num_niveles').value - 1);
    }
  }

  rubricColors(i: any) {
    return {
      'background-color': this.colors[i],
      color: '#fff',
    };
  }

  private addCriterioGroup(): FormGroup {
    return this.fb.group({
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      puntuacion: [0, [Validators.required, Validators.min(0)]],
      niveles: this.fb.array([]),
    });
  }

  private NivelesGroup(): FormGroup {
    return this.fb.group({
      // titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      puntuacion: [0, [Validators.required, Validators.min(0)]],
    });
  }

  get criterioArray(): FormArray {
    return <FormArray>this.userForm.get('criterios');
  }

  addCriterios(): void {
    this.criterioArray.controls = [];
    for (let i = 0; i < this.userForm.get('num_criterios').value; i++) {
      this.criterioArray.push(this.addCriterioGroup());
    }
    this.addNiveles();
  }

  addNiveles(): void {
    [...Array(this.userForm.get('num_niveles').value).keys()].forEach((i) => {
      (<FormArray>this.userForm.get('criterios')).controls.forEach((criterio) => {
        (<FormArray>criterio.get('niveles')).push(this.NivelesGroup());
      });
    });
  }

  nivelesGroup(nivel: any) {
    return <FormArray>nivel.controls.niveles;
  }

  saveRubrica() {
    console.log(this.userForm.value);
    // Save Rubrica
  }
}
