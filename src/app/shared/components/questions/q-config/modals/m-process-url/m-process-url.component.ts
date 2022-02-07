import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-m-process-url',
  templateUrl: './m-process-url.component.html',
  styleUrls: ['./m-process-url.component.scss']
})
export class MProcessUrlComponent implements OnInit {
  loading:boolean = false;
  @Input() item:any;
  formHeader: any = FormGroup;
  constructor(public activeModal: NbDialogRef<MProcessUrlComponent>, private formBuilder: FormBuilder,
    private generalServi: GeneralService) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      url_externa: ['', [Validators.required]],
      tamano_peso: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      key_video: ['', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
  }
  closeModal() {
    const params = {
      close: 'close',
      value: '',
    }
    this.activeModal.close(params);
  }
  procesar() {
    const serviceName = END_POINTS.base_back.config + '/meta';
    if (this.formHeader.value.url_externa) {
      const params = {
        url: this.formHeader.value.url_externa,
      };

      this.loading = true;
      this.generalServi.addNameData$(serviceName, params).subscribe(r => {
        if (r.success) {
          const data = r.data;
          // this.fieldReactive();
          this.formHeader.patchValue({
            titulo: data.title || data['twitter:title'] || '',
            descripcion: data.description || '',
            tamano_peso: data['twitter:app:name:googleplay'] || '',
            key_video: this.recopilaKeyVideo(this.formHeader.value.url_externa, data['twitter:app:name:googleplay']),
          });
        }
      }, () => { this.loading = false; }, () => { this.loading = false; });
    }
  }
  recopilaKeyVideo(url:any, tamanoPeso: any) {
    let idKeyVideo = '';
    switch (tamanoPeso) {
      case 'YouTube':
        const re:any = /^(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;
        const you = url.match(re)[7];
        idKeyVideo = you;
        break;
      case 'Vimeo':
        const a = /(videos|video|channels|\.com)\/([\d]+)/;
        const vim = url.match(a)[2];
        idKeyVideo = vim;
        break;
      default:

        break;
    }
    return idKeyVideo;
  }
  valueLink() {
    if (!this.formHeader.value.url_externa) {
      this.fieldReactive();
    }
  }
  anadirValues() {
    const params = {
      close: 'ok',
      value: this.formHeader.value,
    }
    this.activeModal.close(params);
  }
}
