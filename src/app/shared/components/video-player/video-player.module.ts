import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from './video-player.component';
import { SafeUrlModule } from '../../pipes/safe-url/safe-url.module';
import { NebularModule } from '../../nebular.module';



@NgModule({
  declarations: [VideoPlayerComponent],
  imports: [
    CommonModule,
    SafeUrlModule,
    NebularModule
  ],
  exports: [VideoPlayerComponent]
})
export class VideoPlayerModule { }
