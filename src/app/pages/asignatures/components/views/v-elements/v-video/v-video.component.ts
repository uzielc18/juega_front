import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-video',
  templateUrl: './v-video.component.html',
  styleUrls: ['./v-video.component.scss']
})
export class VVideoComponent implements OnInit, OnChanges {
  loomId: any;
  fbId: any;
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
    this.vimeoId = this.getIdVimeo(this.element?.url_externa);
    this.youtubeId = this.getIdYoutube(this.element?.url_externa);
    console.log(this.vimeoId)
    this.videoEmbedYoutube = `https://www.youtube.com/embed/${this.youtubeId}`;
    this.videoEmbedVimeo = `https://player.vimeo.com/video/${this.vimeoId}?h=47b33a7ed2`;
    this.videoEmbedFacebook = ``
    this.videoEmbedLoom = ``
  }

  ngOnInit(): void {
  }

  getIdYoutube(url: any) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  getIdVimeo(url: any) {
    const regExp = /http:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
    const match = url.match(regExp);

    return (match && match[2])
      ? match[2]
      : null;
  }

}
