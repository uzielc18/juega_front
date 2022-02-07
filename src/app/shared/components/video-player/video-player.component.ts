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
  @Input() element: any;
  @Input() pending: any;
  @Input() userInfo: any;
  constructor(
  ) { }

  ngOnChanges(): void {
    this.element = this.element;
    this.pending = this.pending;
    if (this.element) {
      this.vimeoId = this.parseVideo(this.element?.url_externa);
      this.youtubeId = this.parseVideo(this.element?.url_externa);
      this.loomId = this.parseLoom(this.element?.url_externa);
      this.videoEmbedYoutube = `https://www.youtube.com/embed/${this.youtubeId.id}`;
      this.videoEmbedVimeo = `https://player.vimeo.com/video/${this.vimeoId.id}?h=47b33a7ed2`;
      this.videoEmbedFacebook = `https://www.facebook.com/plugins/video.php?href=${this.element?.url_externa}&show_text=0&width=560`
      this.videoEmbedLoom = `${this.loomId}`;
    } else if (this.pending) {
      this.vimeoId = this.parseVideo(this.pending?.url);
      this.youtubeId = this.parseVideo(this.pending?.url);
      this.soundcloudUrl = this.pending?.url;
      this.videoEmbedYoutube = `https://www.youtube.com/embed/${this.youtubeId.id}`;
      this.videoEmbedVimeo = `https://player.vimeo.com/video/${this.vimeoId.id}?h=47b33a7ed2`;
      this.audioEmbedSoundcloud = `https://w.soundcloud.com/player/?url=${this.soundcloudUrl}&color=%23ff0065&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`;
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
