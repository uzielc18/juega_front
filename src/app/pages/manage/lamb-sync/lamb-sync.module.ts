import { NgModule } from '@angular/core';
import { LambSyncRoutingModule } from './lamb-sync-routing.module';
import { NebularModule } from 'src/app/shared/nebular.module';
import { ControlMessagesModule } from 'src/app/shared/components/control-messages/control-messages.module';
import { GeneralService } from 'src/app/providers';
import { LambSyncComponent } from './lamb-sync.component';
import { LambSyncHomeComponent } from './containers/lamb-sync-home.component';
import { ListDocenteComponent } from './components/modals/list-docente/list-docente.component';
import { ListCursosComponent } from './components/modals/list-cursos/list-cursos.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListSilabusComponent } from './components/modals/list-silabus/list-silabus.component';
import { ListEstudiantesComponent } from './components/modals/list-estudiantes/list-estudiantes.component';
import { FormsModule } from '@angular/forms';
import { ListMatriculasComponent } from './components/modals/list-matriculas/list-matriculas.component';
import { ListEvaluationsComponent } from './components/modals/list-evaluations/list-evaluations.component';

const COMPONENTS: any[] = [
  LambSyncComponent,
  LambSyncHomeComponent

];
const NG_MODULES: any = [
  NebularModule,
  NgbPaginationModule,
  FormsModule
];
const NGB_MODULES: any = [
  // NgbModule
];
const CONTROL_MESSAGGE: any = [
  ControlMessagesModule,
];
const SERIVCES: any = [
  GeneralService,
];
const MODALS: any = [
];
const NGX_MODULES: any = [
];
const MODULES: any = [
];

@NgModule({
  providers: [
    ...SERIVCES,
  ],
  imports: [
    LambSyncRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS, ListDocenteComponent, ListCursosComponent, ListSilabusComponent, ListEstudiantesComponent, ListMatriculasComponent, ListEvaluationsComponent],
  entryComponents: [...MODALS],
})
export class LambSyncModule { }