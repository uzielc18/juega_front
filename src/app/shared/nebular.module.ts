import { NgModule } from '@angular/core';
import {
  NbAccordionModule,
  NbActionsModule,
  NbAlertModule,
  NbAutocompleteModule,
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbMenuModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTimepickerModule,
  NbToggleModule,
  NbTooltipModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogConfimComponent } from './components/dialog-confim/dialog-confim.component';

const ANGULAR: any[] = [CommonModule, FormsModule, ReactiveFormsModule];

const COMPONENTS: any[] = [
  NbCardModule,
  NbTabsetModule,
  NbButtonModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbAutocompleteModule,
  NbDatepickerModule,
  NbTimepickerModule,
  NbRadioModule,
  NbCheckboxModule,
  NbTooltipModule,
  NbToggleModule,
  NbDialogModule.forChild(),
  NbAlertModule,
  NbListModule,
  NbAccordionModule,
  NbActionsModule,
  NbPopoverModule,
  NbSpinnerModule,
  NbContextMenuModule,
  NbProgressBarModule,
  NbFormFieldModule,
  NbMenuModule,
  NbButtonGroupModule,
];

@NgModule({
  declarations: [DialogConfimComponent],
  imports: [...ANGULAR, ...COMPONENTS],
  exports: [...ANGULAR, ...COMPONENTS],
})
export class NebularModule {}
