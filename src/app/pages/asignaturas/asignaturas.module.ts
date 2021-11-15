import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignaturasComponent } from './contents/asignaturas/asignaturas.component';
import {RouterModule} from '@angular/router';
import {NbButtonModule, NbCardModule} from '@nebular/theme';
import { CursoComponent } from './components/curso/curso.component';
import {NebularModule} from '../../shared/nebular.module';



@NgModule({
  declarations: [
    AsignaturasComponent,
    CursoComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: AsignaturasComponent,
                children: [
                    {
                        path: 'curso',
                        component: CursoComponent
                    },
                ]
            }

        ]),
      NebularModule
    ]
})
export class AsignaturasModule { }
