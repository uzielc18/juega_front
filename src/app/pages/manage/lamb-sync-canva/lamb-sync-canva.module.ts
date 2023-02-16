import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LambSyncCanvaRoutingModule } from './lamb-sync-canva-routing.module';
import { LambSyncCanvaComponent } from './lamb-sync-canva.component';
import { LambSyncCanvaHomeComponent } from './containers/lamb-sync-canva-home.component';
import {NebularModule} from "../../../shared/nebular.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { VCourseComponent } from './components/view/v-course/v-course.component';
import { VTeacherAddCourseComponent } from './components/view/v-teacher-add-course/v-teacher-add-course.component';
import { VTeacherComponent } from './components/view/v-teacher/v-teacher.component';
import { VStudentsComponent } from './components/view/v-students/v-students.component';
import { VEnrollmentComponent } from './components/view/v-enrollment/v-enrollment.component';
import { VZoomComponent } from './components/view/v-zoom/v-zoom.component';
import { MCourseComponent } from './components/modals/m-course/m-course.component';
import { MTeacherComponent } from './components/modals/m-teacher/m-teacher.component';
import { MStudentsComponent } from './components/modals/m-students/m-students.component';
import { MEnrollmentCanvaComponent } from './components/modals/m-enrollment-canva/m-enrollment-canva.component';
import { MTeacherAddCourseComponent } from './components/modals/m-teacher-add-course/m-teacher-add-course.component';
import { TDocentePComponent } from './components/modals/m-teacher-add-course/components/tabs/t-docente-p/t-docente-p.component';
import { TDocenteTComponent } from './components/modals/m-teacher-add-course/components/tabs/t-docente-t/t-docente-t.component';
import { MZoomComponent } from './components/modals/m-zoom/m-zoom.component';


@NgModule({
  declarations: [
    LambSyncCanvaComponent,
    LambSyncCanvaHomeComponent,
    VCourseComponent,
    VTeacherAddCourseComponent,
    VTeacherComponent,
    VStudentsComponent,
    VEnrollmentComponent,
    VZoomComponent,
    MCourseComponent,
    MTeacherComponent,
    MStudentsComponent,
    MEnrollmentCanvaComponent,
    MTeacherAddCourseComponent,
    TDocentePComponent,
    TDocenteTComponent,
    MZoomComponent
  ],
  imports: [
    CommonModule,
    LambSyncCanvaRoutingModule,
    NebularModule,
    NgbModule
  ]
})
export class LambSyncCanvaModule { }
