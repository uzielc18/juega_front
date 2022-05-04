import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from '../../../../providers';
import { END_POINTS } from '../../../../providers/utils';

@Component({
  selector: 'app-create-rubric',
  templateUrl: './create-rubric.component.html',
  styleUrls: ['./create-rubric.component.scss'],
})
export class CreateRubricComponent implements OnInit {
  // @Input() rubrica: any = null;
  rubrica: any = {
    id: 1,
    nombre: 'Rubrica sssssssssss',
    descripcion: 'aaaaaaaa',
    num_criterios: 2,
    num_niveles: 3,
    criterios: [
      {
        titulo: 'Criterio 1',
        descripcion: 'ssssss',
        puntuacion: 5,
        niveles: [
          {
            titulo: 'Nivel 1',
            descripcion: 'aaaaaaaaaaaa',
            puntuacion: 5,
          },
          {
            titulo: 'Nivel 2',
            descripcion: 'bbbbbbbbbbbbb',
            puntuacion: 4,
          },
          {
            titulo: 'Nivel 3',
            descripcion: 'ccccccccccc',
            puntuacion: 4,
          },
        ],
      },
      {
        titulo: 'Criterio 2',
        descripcion: 'ssssss',
        puntuacion: 5,
        niveles: [
          {
            titulo: 'Nivel 1',
            descripcion: 'aaaaaaaaaaaa',
            puntuacion: 5,
          },
          {
            titulo: 'Nivel 2',
            descripcion: 'bbbbbbbbbbbbb',
            puntuacion: 4,
          },
          {
            titulo: 'Nivel 3',
            descripcion: 'ccccccccccc',
            puntuacion: 4,
          },
        ],
      },
    ],
  };

  titles: any = [];

  loading: boolean = false;
  userForm: any = FormGroup;

  colors: any[] = ['#57884e', '#8ba642', '#f9c851', '#f9a65a', '#f97a5a', '#f94a5a', '#f9065a'];

  constructor(
    public activeModal: NbDialogRef<CreateRubricComponent>,
    private fb: FormBuilder,
    private generalService: GeneralService
  ) {
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: [''],
      num_criterios: [4, [Validators.required, Validators.min(1), Validators.max(7)]],
      num_niveles: [4, [Validators.required, Validators.min(1)]],
      criterios: this.fb.array([this.addCriterioGroup()]),
    });
  }

  ngOnInit(): void {
    this.initialCriterios();
  }

  closeModal() {
    this.activeModal.close('close');
  }

  upNumCriterio() {
    if (this.userForm.get('num_criterios').value >= 0) {
      this.userForm.get('num_criterios').setValue(this.userForm.get('num_criterios').value + 1);
      this.addCriterios();
    }
  }

  downNumCriterio() {
    if (this.userForm.get('num_criterios').value > 1) {
      this.userForm.get('num_criterios').setValue(this.userForm.get('num_criterios').value - 1);
      this.removeCriterios();
    }
  }

  upNumNivel() {
    if (this.userForm.get('num_niveles').value >= 0 && this.userForm.get('num_niveles').value < 7) {
      this.userForm.get('num_niveles').setValue(this.userForm.get('num_niveles').value + 1);
      this.addNiveles();
    }
  }

  downNumNivel() {
    if (this.userForm.get('num_niveles').value > 1) {
      this.userForm.get('num_niveles').setValue(this.userForm.get('num_niveles').value - 1);
      this.removeNiveles();
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
      descripcion: [''],
      puntuacion: [0, [Validators.required, Validators.min(0)]],
      niveles: this.fb.array([]),
    });
  }

  private NivelesGroup(): FormGroup {
    return this.fb.group({
      titulo: [''],
      descripcion: ['', [Validators.required]],
      puntuacion: [0, [Validators.required, Validators.min(0)]],
      // // rubrica: this.fb.group({
      //   descripcion: ['', [Validators.required]],
      //   puntuacion: [0, [Validators.required, Validators.min(0)]],
      // }),
    });
  }

  get criterioArray(): FormArray {
    return <FormArray>this.userForm.get('criterios');
  }

  initialCriterios() {
    const control = <FormArray>this.userForm.controls.criterios;
    control.controls = [];
    if (this.rubrica !== null) {
      this.userForm.patchValue({
        nombre: this.rubrica.nombre,
        descripcion: this.rubrica.descripcion,
        num_criterios: this.rubrica.num_criterios,
        num_niveles: this.rubrica.num_niveles,
      });
      this.rubrica.criterios.forEach((criterio: any) => {
        control.push(this.addCriterioGroup());
        this.criterioArray.controls[control.controls.length - 1].patchValue(criterio);
        const niveles = <FormArray>this.criterioArray.controls[control.controls.length - 1].get('niveles');
        niveles.controls = [];
        this.titles = [];
        criterio.niveles.forEach((nivel: any) => {
          niveles.push(this.NivelesGroup());
          niveles.controls[niveles.controls.length - 1].patchValue(nivel);
          this.titles.push({ nombre: nivel.titulo });
        });
      });
    } else {
      for (let i = 0; i < this.userForm.get('num_criterios').value; i++) {
        control.push(this.addCriterioGroup());
        this.initialNiveles();
      }
    }
  }

  addCriterios(): void {
    const control = <FormArray>this.userForm.controls['criterios'];
    const newCriterio = this.addCriterioGroup();
    const niveles = <FormArray>newCriterio.controls['niveles'];
    for (let i = 0; i < this.userForm.get('num_niveles').value; i++) {
      niveles.push(this.NivelesGroup());
    }
    control.push(newCriterio);
  }

  removeCriterios(): void {
    const control = <FormArray>this.userForm.controls['criterios'];
    control.removeAt(control.length - 1);
  }

  initialNiveles() {
    this.criterioArray.controls.forEach((criterio: any) => {
      const niveles = <FormArray>criterio.get('niveles');
      niveles.controls = [];
      this.titles = [];
      for (let i = 0; i < this.userForm.get('num_niveles').value; i++) {
        criterio.get('niveles').push(this.NivelesGroup());
        this.titles.push({ nombre: `Nivel ${i + 1}` });
      }
    });
  }

  addNiveles(): void {
    this.criterioArray.controls.forEach((criterio: any) => {
      criterio.get('niveles').push(this.NivelesGroup());
    });
    this.titles.push({ nombre: `Nivel ${this.userForm.get('num_niveles').value}` });
  }

  removeNiveles(): void {
    this.criterioArray.controls.forEach((criterio: any) => {
      criterio.get('niveles').removeAt((<FormArray>criterio.get('niveles')).length - 1);
    });
    this.titles.pop();
  }

  shift(index1: number, index2: number): void {
    const data = [...this.userForm.get('criterios').value];
    if (index2 > 0 && index1 < data.length - 1) {
      [data[index1], data[index2]] = [data[index2], data[index1]];
      this.userForm.get('criterios').setValue(data);
    }
  }

  nivelesGroup(nivel: any) {
    return <FormArray>nivel.controls.niveles;
  }

  saveRubrica() {
    this.criterioArray.controls.forEach((criterio: any) => {
      criterio.get('niveles').controls.forEach((nivel: any, index: any) => {
        nivel.get('titulo').setValue(this.titles[index].nombre);
      });
    });
    // console.log(this.userForm.value);
    const serviceName = END_POINTS.base_back.rubrics + '/save-rubrica';
    this.loading = true;
    this.generalService.addNameData$(serviceName, this.userForm.value).subscribe(
      (res: any) => {
        if (res.success) {
          console.log(res);
          this.activeModal.close('ok');
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
