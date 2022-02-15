import { NgModule } from '@angular/core';
import { GeneralService } from 'src/app/providers';
import { ControlMessagesModule } from 'src/app/shared/components/control-messages/control-messages.module';
import { NebularModule } from 'src/app/shared/nebular.module';
import { ZoomHomeComponent } from './containers/zoom-home.component';

import { ZoomRoutingModule } from './zoom-routing.module';
import { ZoomComponent } from './zoom.component';
import { UpZoomComponent } from './components/modals/up-zoom/up-zoom.component';
import { ZoomCourseComponent } from './components/modals/zoom-course/zoom-course.component';

const COMPONENTS: any[] = [
  ZoomComponent,
  ZoomHomeComponent,
  UpZoomComponent,
  ZoomCourseComponent
];
const NG_MODULES: any = [
  NebularModule,
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
  UpZoomComponent,
  ZoomCourseComponent
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
    ZoomRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})

export class ZoomModule { }
