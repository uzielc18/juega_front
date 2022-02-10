import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUniqueOptionComponent } from './c-unique-option/c-unique-option.component';
import { CMultiOptionComponent } from './c-multi-option/c-multi-option.component';
import { CTrueFalseComponent } from './c-true-false/c-true-false.component';
import { CRelationComponent } from './c-relation/c-relation.component';
import { COpenComponent } from './c-open/c-open.component';
import { CClosedComponent } from './c-closed/c-closed.component';
import { NebularModule } from 'src/app/shared/nebular.module';
import { QConfigComponent } from './q-config.component';
import { PrepareFileProModule } from '../../prepare-file-pro/prepare-file-pro.module';
import { MProcessUrlComponent } from './modals/m-process-url/m-process-url.component';
import { ControlMessagesModule } from '../../control-messages/control-messages.module';
import { VideoPlayerModule } from '../../video-player/video-player.module';
import { GeneralService } from 'src/app/providers';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { QViewModule } from '../q-view/q-view.module';
const COMPONENTS: any = [
  QConfigComponent,
  CUniqueOptionComponent,
  CMultiOptionComponent,
  CTrueFalseComponent,
  CRelationComponent,
  COpenComponent,
  CClosedComponent,
  MProcessUrlComponent,
];
const NG_MODULES: any = [
  NebularModule,
];
const MODALS: any = [
  MProcessUrlComponent,
];
const CONTROL_MESSAGGE: any = [
  ControlMessagesModule,
];
const MODULOS: any = [
  PrepareFileProModule,
  VideoPlayerModule,
  DragDropModule,
  QViewModule
];
const EXPORTS_COMPONENTS: any = [
  QConfigComponent,
  CMultiOptionComponent,
  CUniqueOptionComponent,
  CTrueFalseComponent,
  COpenComponent,
  CClosedComponent,
  CRelationComponent
];
const SERVICES: any = [
  GeneralService
];

@NgModule({
  declarations: [...COMPONENTS,],
  entryComponents: [...MODALS],
  imports: [
    CommonModule,
    ...NG_MODULES,
    ...MODULOS,
    CONTROL_MESSAGGE,
  ],
  exports: [...EXPORTS_COMPONENTS],
  providers: [...SERVICES]
})
export class QConfigModule { }
