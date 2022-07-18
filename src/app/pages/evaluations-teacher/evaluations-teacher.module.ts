import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationsTeacherRoutingModule } from './evaluations-teacher-routing.module';
import { EvaluationsTeacherComponent } from './evaluations-teacher.component';
import { EvaluationsTeacherHomeComponent } from './containers/evaluations-teacher-home.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NebularModule } from '../../shared/nebular.module';
import {MNoteWorksHomeModule} from "../../shared/components/notes-works/modal/m-note-works-home.module";

const COMPONENTS: any = [
  EvaluationsTeacherComponent,
  EvaluationsTeacherHomeComponent
]
const MODULES: any = [
  NgbPaginationModule,
  MNoteWorksHomeModule
]

const NEBULAR: any = [
  NebularModule
]


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    EvaluationsTeacherRoutingModule,
    ...NEBULAR,
    ...MODULES,
  ]
})
export class EvaluationsTeacherModule { }
