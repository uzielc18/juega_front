import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxViewFilesGoogleComponent } from './ngx-view-files-google.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { GeneralService } from 'src/app/providers';
import { NbIconModule, NbTooltipModule } from '@nebular/theme';

const NG_MODULES: any = [
  NbIconModule,
  NbTooltipModule
];

@NgModule({
  declarations: [NgxViewFilesGoogleComponent],
  imports: [CommonModule, NgxDocViewerModule, ...NG_MODULES],
  exports: [NgxViewFilesGoogleComponent],
  providers: [GeneralService]
})

export class NgxViewFilesGoogleModule { }
