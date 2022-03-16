import { NgModule } from '@angular/core';
import { GeneralService } from 'src/app/providers';
import { ControlMessagesModule } from 'src/app/shared/components/control-messages/control-messages.module';
import { NebularModule } from 'src/app/shared/nebular.module';
import { ZoomHomeComponent } from './containers/zoom-home.component';

import { ZoomRoutingModule } from './zoom-routing.module';
import { ZoomComponent } from './zoom.component';
import { UpZoomComponent } from './components/modals/up-zoom/up-zoom.component';
import { ZoomCourseComponent } from './components/modals/zoom-course/zoom-course.component';
import { ConfigZoomComponent } from './components/modals/zoom-course/config-zoom/config-zoom.component';
import { FilterPipeModule } from 'src/app/shared/pipes/filterPipe/filterPipe.module';
import { VZoomValidateComponent } from './components/views/v-zoom-validate/v-zoom-validate.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectSearchModule } from 'src/app/shared/components/selectors/select-search/select-search.module';
const COMPONENTS: any[] = [
  ZoomComponent,
  ZoomHomeComponent,
  UpZoomComponent,
  ZoomCourseComponent,
  ConfigZoomComponent,
  VZoomValidateComponent
];
const NG_MODULES: any = [
  NebularModule,
];
const NGB_MODULES: any = [
  NgbModule,
];
const CONTROL_MESSAGGE: any = [
  ControlMessagesModule,
];
const SERIVCES: any = [
  GeneralService,
];
const MODALS: any = [
  UpZoomComponent,
  ZoomCourseComponent,
  ConfigZoomComponent
];
const NGX_MODULES: any = [
];
const MODULES: any = [
  SelectSearchModule,
];
const PIPES: any = [
  FilterPipeModule,
];
@NgModule({
  providers: [
    ...SERIVCES,
  ],
  imports: [
    ZoomRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
    ...PIPES
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})

export class ZoomModule { }
