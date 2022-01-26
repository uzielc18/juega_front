import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-video',
  templateUrl: './v-video.component.html',
  styleUrls: ['./v-video.component.scss']
})
export class VVideoComponent implements OnInit, OnChanges {
  loomId: any;
  vimeoId: any;
  youtubeId: any;
  videoEmbedYoutube: any;
  videoEmbedVimeo: any;
  videoEmbedFacebook: any;
  videoEmbedLoom: any;
  @Input() element: any;
  @Input() userInfo: any;

  constructor(
  ) { }

  ngOnChanges(): void {
    this.vimeoId = this.parseVideo(this.element?.url_externa);
    this.youtubeId = this.parseVideo(this.element?.url_externa);
    this.loomId = this.parseLoom(this.element?.url_externa);
    this.videoEmbedYoutube = `https://www.youtube.com/embed/${this.youtubeId.id}`;
    this.videoEmbedVimeo = `https://player.vimeo.com/video/${this.vimeoId.id}?h=47b33a7ed2`;
    this.videoEmbedFacebook = `https://www.facebook.com/plugins/video.php?href=${this.element?.url_externa}&show_text=0&width=560`
    this.videoEmbedLoom = `${this.loomId}`;
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
