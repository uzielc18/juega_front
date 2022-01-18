import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { EmitEventsService } from 'src/app/shared/services/emit-events.service';
import { CursosService } from '../../cursos/services/cursos.service';

@Component({
  selector: 'app-asignatures-home',
  templateUrl: './asignatures-home.component.html',
  styleUrls: ['./asignatures-home.component.scss']
})
export class AsignaturesHomeComponent implements OnInit {
  roles: any = [];
  semestres: any = [];
  form: any = FormGroup;
  constructor(
    private userService: AppService,
    private generalService: GeneralService,
    private formBuilder: FormBuilder,
    private emitEventsService: EmitEventsService,
  ) {}

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      semestre: [''],
      rol: [''],
    };
    this.form = this.formBuilder.group(controls);
    this.getRoles();
    this.getSemestres();
  }

  getRoles() {
    this.roles = this.userService.rol.filter((rol: any) =>
      ['Estudiante', 'Docente'].includes(rol.name)
    );
    this.form.get('rol')?.patchValue(this.roles[0].name);
  }

  getSemestres() {
    const serviceName = END_POINTS.base_back.user + '/mysemesters';
    this.generalService.nameAll$(serviceName).subscribe((res:any) => {
      this.semestres = res.data || [];
      if (this.semestres.length>0)  {
        const vigent = this.semestres.find((r:any) => r.vigente === '1');
        if (vigent) {
          this.form.patchValue({
            semestre: vigent.id,
          });
          this.updateSemestre(vigent.id);
        } else {
          this.form.patchValue({
            semestre: this.semestres[0].id,
          });
          this.updateSemestre(this.semestres[0].id);
        }
      }
     });
  }
  changeRol() {

  }
  changeSemestre($event:any) {
    this.updateSemestre($event);

  }

  updateSemestre(id:any) {
    const serviceName = END_POINTS.base_back.user + '/updatesemester';
    if (id) {
      this.generalService.nameId$(serviceName, id).subscribe((data:any) => {
        if (data.success) {
          console.log('Si pado');
          this.emitEventsService.valuesRolSem$.emit(this.form.value); //Guardar valores en la cabecera
        }
      });
    }
  }
}
