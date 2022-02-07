import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, OnChanges {

  @Output() loadingsFiles: EventEmitter<boolean> = new EventEmitter();

  loomId: any;
  vimeoId: any;
  youtubeId: any;
  soundcloudUrl: any;
  videoEmbedYoutube: any;
  videoEmbedVimeo: any;
  videoEmbedFacebook: any;
  videoEmbedLoom: any;
  audioEmbedSoundcloud: any;

  @Input() url: any;
  @Input() videoFormat: any;

  constructor(
  ) { }

  ngOnChanges(): void {
    this.url = this.url;
    this.videoFormat = this.videoFormat;
    switch (this.videoFormat) {
      case 'YouTube':
      case 'YOUTUBE':
        this.youtubeId = this.parseVideo(this.url);
        this.videoEmbedYoutube = `https://www.youtube.com/embed/${this.youtubeId.id}`;
        break;
      case 'Vimeo':
      case 'VIMEO':
        this.vimeoId = this.parseVideo(this.url);
        this.videoEmbedVimeo = `https://player.vimeo.com/video/${this.vimeoId.id}?h=47b33a7ed2`;
        break;
      case 'Facebook':
      case 'FACEBOOK':
        this.videoEmbedFacebook = `https://www.facebook.com/plugins/video.php?href=${this.url}&show_text=0&width=560`;
        break;
      case 'Loom':
      case 'LOOM':
        this.loomId = this.parseLoom(this.url);
        this.videoEmbedLoom = `${this.loomId}`;
        break;
      case 'SoundCloud':
      case 'SOUNDCLOUD':
        this.audioEmbedSoundcloud = `https://w.soundcloud.com/player/?url=${this.url}&color=%23ff0065&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`;
        break;
      case 'Audio':
      case 'AUDIO':
      case 'REFERENCIA':
      default:
        this.url = this.url;
        break;
    }
  }

  ngOnInit(): void {
  }

  parseLoom(url: any) {
    return url.replace("share", "embed");
  }

  parseVideo(url: any) {
    url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
    if (RegExp.$3.indexOf('youtu') > -1) {
      let type = 'youtube';
    } else if (RegExp.$3.indexOf('vimeo') > -1) {
      let type = 'vimeo';
    }
    return {
      id: RegExp.$6
    };
  }
}
