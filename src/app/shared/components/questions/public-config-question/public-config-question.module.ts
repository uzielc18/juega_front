import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicConfigQuestionComponent } from './public-config-question.component';
import { NebularModule } from 'src/app/shared/nebular.module';
import { ControlMessagesModule } from '../../control-messages/control-messages.module';
import { GeneralService } from 'src/app/providers';

const COMPONENTS: any = [
  PublicConfigQuestionComponent,
];
const NG_MODULES: any = [
  NebularModule,
];
const MODALS: any = [
];
const CONTROL_MESSAGGE: any = [
  ControlMessagesModule,
];
const MODULOS: any = [
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
  exports: [...COMPONENTS],
  providers: [...SERVICES]
})

export class PublicConfigQuestionModule { }
