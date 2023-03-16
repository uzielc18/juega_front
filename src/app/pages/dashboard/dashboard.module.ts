import { NgModule } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CardListCourseModule } from 'src/app/shared/components/card-list-course/card-list-course.module';
import { GeneralService } from '../../providers';
import { PreviewNewsModule } from '../../shared/components/news-comp/preview-news/preview-news.module';
import { ImageRecorteModule } from '../../shared/components/recortes/image-recorte/image-recorte.module';
import { NebularModule } from '../../shared/nebular.module';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DashboardHomeComponent } from './containers/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChartTrabajosComponent } from './components/chart-trabajos/chart-trabajos.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {NgChartsModule} from "ng2-charts";
import {Ng2ChartsComponentModule} from "../../shared/components/ng2-charts/view/ng2-charts-component.module";

const COMPONENTS: any[] = [
  DashboardComponent,
  DashboardHomeComponent,
  PerfilComponent,
  ChartTrabajosComponent
];
const NG_MODULES: any = [
  NebularModule,
];
const NGB_MODULES: any = [
  // NgbModule
  NgbCarouselModule,
];
const CONTROL_MESSAGGE: any = [
];
const SERVICES: any = [
  GeneralService
];
const MODALS: any = [
];
const NGX_MODULES: any = [
];
const PIPES: any = [
];
const MODULES: any = [
  CardListCourseModule,
  ImageRecorteModule,
  PreviewNewsModule,
  NgChartsModule
]

@NgModule({
  providers: [
    ...SERVICES,
  ],
    imports: [
        DashboardRoutingModule,
        ...NG_MODULES,
        ...NGB_MODULES,
        ...CONTROL_MESSAGGE,
        ...NGX_MODULES,
        ...MODULES,
        NgCircleProgressModule.forRoot({}),
        Ng2ChartsComponentModule,
    ],
  declarations: [...COMPONENTS, ...PIPES],
  entryComponents: [...MODALS],

  exports: [
    PerfilComponent
  ]
})
export class DashboardModule { }
