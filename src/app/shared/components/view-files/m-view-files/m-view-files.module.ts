import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbSpinnerModule } from '@nebular/theme';
import { MViewFilesComponent } from './m-view-files.component';
import { NgxViewFilesGoogleModule } from '../ngx-view-files-google/ngx-view-files-google.module';
import { VideoPlayerModule } from '../../video-player/video-player.module';

const NG_MODULES: any = [
  NbCardModule,
  NbButtonModule,
  NbDialogModule.forChild(),
  NbInputModule,
  NbSpinnerModule,
  NbIconModule,
];
@NgModule({
  declarations: [MViewFilesComponent],
  imports: [CommonModule, ...NG_MODULES, NgxViewFilesGoogleModule, VideoPlayerModule],
  exports: [MViewFilesComponent],
  providers: [],
  entryComponents: [MViewFilesComponent]
})
export class MViewFilesModule { }
