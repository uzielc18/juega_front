import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {END_POINTS} from "../../../../../../providers/utils";
import {GeneralService} from "../../../../../../providers";

@Component({
  selector: 'app-created-poll',
  templateUrl: './created-poll.component.html',
  styleUrls: ['./created-poll.component.scss']
})
export class CreatedPollComponent implements OnInit {

  loading: boolean = false
  formHeader2: any = FormGroup;
  formHeader: any = FormGroup;
  disable: boolean = true;
  listIcons: any = [
    {
      checked: false,
      name: 'YouTube',
      value: 'YOUTUBE',
      link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/YouTube_social_white_squircle.svg/800px-YouTube_social_white_squircle.svg.png',
      id: 1,
    },
    {
      checked: false,
      name: 'Loom',
      value: 'LOOM',
      link: 'https://www.softwareflavor.com/images/8c/8c9f868b431b37a964c5269cef2878b7.png',
      id: 2,
    },
    {
      checked: false,
      name: 'Vimeo',
      value: 'VIMEO',
      link: 'https://w7.pngwing.com/pngs/805/486/png-transparent-vimeo-youtube-logo-computer-icons-youtube-blue-text-trademark.png',
      id: 3,
    },
    {
      checked: false,
      name: 'Facebook',
      value: 'FACEBOOK',
      link: 'https://www.centroveterinarioalbayda.com/wp-content/uploads/2015/01/facebook-veterinaria.png',
      id: 4,
    },
  ];

  constructor(private formBuilder: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fieldReactive();
    this.fieldReactive2();
  }
  private fieldReactive2() {
    const controls = {
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      tipo_filtro: ['', [Validators.required]],
      publicar: [false],
      todos: [false],
      edad_desde: [''],
      edad_hasta: [''],
      url: [''],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      area: [''],
      mostrar_boton: [false],
      nombre_boton: [''],
      contenido: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      base64_url: ['', [Validators.required]],
    };
    this.formHeader2 = this.formBuilder.group(controls);
  }
  private fieldReactive() {
    const controls = {
      url_externa: ['', [Validators.required]],
      tamano_peso: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
  }

  procesar() {
    this.disable = true;
    const serviceName = END_POINTS.base_back.config + '/meta';
    if (this.formHeader.value.url_externa) {
      const params = {
        url: this.formHeader.value.url_externa,
      };

      this.loading = true
      this.generalService.addNameData$(serviceName, params).subscribe(
        (r) => {
          if (r.success) {
            const data = r.data;
            this.vaciarCamps();
            this.formHeader.patchValue({
              titulo: data.title || data['twitter:title'] || '',
              descripcion: data.description || '',
              tamano_peso: data['twitter:app:name:googleplay'] || '',
            });
            if (data['twitter:app:name:googleplay']) {
              this.listIcons.map((r: any) => {
                if (r.name === data['twitter:app:name:googleplay']) {
                  r.checked = true;
                }
              });
            } else {
              this.disable = false;
            }
          }
        },
        () => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }

  vaciarCamps() {
    this.formHeader.patchValue({
      tamano_peso: '',
      titulo: '',
      descripcion: '',
    });
    this.listIcons.map((r: any) => {
      r.checked = false;
    });
    this.disable = true;
  }

  valueLink() {
    if (!this.formHeader.value.url_externa) {
      this.vaciarCamps();
    }
  }
  valueButtom(item: any) {
    this.listIcons.forEach((element: any) => {
      element.checked = false;
    });
    item.checked = true;
    this.formHeader.controls['tamano_peso'].setValue(item.name);
  }
}
