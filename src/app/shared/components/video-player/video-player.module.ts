import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from './video-player.component';
import { SafeUrlModule } from '../../pipes/safe-url/safe-url.module';



@NgModule({
  declarations: [VideoPlayerComponent],
  imports: [
    CommonModule,
    SafeUrlModule
  ]
})
export class VideoPlayerModule { }
