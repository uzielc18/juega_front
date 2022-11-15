import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPerfilRoutingModule } from './user-perfil-routing.module';
import { UserPerfilComponent } from './user-perfil.component';
import { UserPerfilHomeComponent } from './containers/user-perfil-home/user-perfil-home.component';
import {NebularModule} from "../../shared/nebular.module";
import {CardListCourseModule} from "../../shared/components/card-list-course/card-list-course.module";
import { PerfilComponent } from './components/perfil/perfil.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { TabsReporteNotasComponent } from './components/tabs/tabs-reporte-notas/tabs-reporte-notas.component';
import {NgxPrintModule} from "ngx-print";
import { MReporteNotasComponent } from './components/tabs/tabs-reporte-notas/modals/m-reporte-notas/m-reporte-notas.component';
import { TabsCursosComponent } from './components/tabs/tabs-cursos/tabs-cursos.component';
import { TabsEditPerfilComponent } from './components/tabs/tabs-edit-perfil/tabs-edit-perfil.component';
import {ImageRecorteModule} from "../../shared/components/recortes/image-recorte/image-recorte.module";
import { TabsMuroComponent } from './components/tabs/tabs-muro/tabs-muro.component';
import {VideoPlayerModule} from "../../shared/components/video-player/video-player.module";
import {AnswersQuestionsModule} from "../../shared/components/answers-questions/view/answers-questions.module";
import {ReactCommentModule} from "../../shared/components/react-comments/view/react-comment.module";
import {NgChartsModule} from "ng2-charts";
import {ElectionsTeachersModule} from "../../shared/components/elections-teacher/view/elections-teachers.module";
import { ViewImgComponent } from './components/tabs/tabs-muro/components/view-img/view-img.component';
const COMPONENTS: any[] = [

]

@NgModule({
  declarations: [
    UserPerfilComponent,
    UserPerfilHomeComponent,
    PerfilComponent,
    TabsReporteNotasComponent,
    MReporteNotasComponent,
    TabsCursosComponent,
    TabsEditPerfilComponent,
    TabsMuroComponent,
    ViewImgComponent,
  ],
    imports: [
        CommonModule,
        UserPerfilRoutingModule,
        NebularModule,
        CardListCourseModule,
        NgbModule,
        NgxPrintModule,
        ImageRecorteModule,
        VideoPlayerModule,
        AnswersQuestionsModule,
        ReactCommentModule,
        NgChartsModule,
        ElectionsTeachersModule,

    ]
})
export class UserPerfilModule { }
