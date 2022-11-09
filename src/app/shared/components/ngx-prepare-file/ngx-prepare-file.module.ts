import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPrepareFileComponent } from './ngx-prepare-file.component';
import { NgxUploadFileComponent } from './upload-file/ngx-upload-file.component';
import {NebularModule} from "../../nebular.module";



@NgModule({
  declarations: [
    NgxPrepareFileComponent,
    NgxUploadFileComponent
  ],
  exports: [
    NgxPrepareFileComponent
  ],
  imports: [
    CommonModule,
    NebularModule,
    //NgxFileDropModule
  ]
})
export class NgxPrepareFileModule { }
