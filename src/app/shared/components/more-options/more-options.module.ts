import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbSelectModule, NbSpinnerModule, NbToggleModule } from '@nebular/theme';
import { MoreOptionsComponent } from './more-options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from '../control-messages/control-messages.module';
const CONTROL_MESSAGGE: any = [
  ControlMessagesModule,
];
const NG_MODULES: any = [
  NbCardModule,
  NbButtonModule,
  NbDialogModule.forChild(),
  NbInputModule,
  NbSpinnerModule,
  NbIconModule,
  NbSelectModule,
  NbToggleModule
];
@NgModule({
  providers: [],
  declarations: [MoreOptionsComponent],
  entryComponents:[],
  exports: [MoreOptionsComponent],
  imports: [CommonModule,FormsModule, ReactiveFormsModule, ...NG_MODULES, ...CONTROL_MESSAGGE]
})
export class MoreOptionsModule { }
