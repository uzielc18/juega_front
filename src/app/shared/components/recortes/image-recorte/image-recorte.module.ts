import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageRecorteComponent } from './image-recorte.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbSpinnerModule, NbTooltipModule } from '@nebular/theme';
import { ImageCropperModule } from 'ngx-image-cropper';

const NG_MODULES: any = [
  NbIconModule,
  NbButtonModule,
  NbCardModule,
  NbTooltipModule,
  NbSpinnerModule,
];

@NgModule({
  declarations: [ImageRecorteComponent],
  imports: [CommonModule, NG_MODULES, ImageCropperModule],
  exports: [ImageRecorteComponent],
  providers: []
})
export class ImageRecorteModule { }
