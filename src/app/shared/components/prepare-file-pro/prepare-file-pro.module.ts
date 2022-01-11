import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbDialogModule, NbInputModule, NbSpinnerModule, NbIconModule } from '@nebular/theme';
import { PrepareFileProComponent } from './prepare-file-pro.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const NG_MODULES: any = [
  NbCardModule,
  NbButtonModule,
  NbDialogModule.forChild(),
  NbInputModule,
  NbSpinnerModule,
  NbIconModule,
];
@NgModule({
  providers: [],
  declarations: [PrepareFileProComponent, UploadFileComponent],
  entryComponents:[UploadFileComponent],
  exports: [PrepareFileProComponent],
  imports: [CommonModule,FormsModule, ReactiveFormsModule, NG_MODULES]
})
export class PrepareFileProModule { }
