import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {END_POINTS} from "../../../../../../providers/utils";
import {GeneralService} from "../../../../../../providers";
import {TreeviewConfig, TreeviewI18n, TreeviewItem} from "ngx-treeview";
import {AppService} from "../../../../../../core";
import {DropdownTreeviewSelectI18n} from "../../../../../../shared/injectables/tree/dropdown-treeview-select-i18n";

@Component({
  selector: 'app-created-poll',
  templateUrl: './created-poll.component.html',
  styleUrls: ['./created-poll.component.scss'],
  providers: [
    { provide: TreeviewI18n, useClass: DropdownTreeviewSelectI18n }
  ]
})
export class CreatedPollComponent implements OnInit {

  loading: boolean = false
  formHeader2: any = FormGroup;
  formHeader: any = FormGroup;
  disable: boolean = true;
  emploreAreas: TreeviewItem[] =  [];
  buttonClasses = [
    'btn-outline-light btn-sm',
  ];
  buttonClass = this.buttonClasses[0];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 350,
  });
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
              private generalService: GeneralService,
              private userService: AppService) { }

  ngOnInit(): void {
    this.fieldReactive();
    this.fieldReactive2();
    this.getProgramNews();
  }
  private fieldReactive2() {
    const controls = {
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      tipo_filtro: ['', [Validators.required]],
      publicar: [false],
      todos: [false],
      edad_desde: [''],
      edad_hasta: [''],
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

  onSelectedChange(events:any){
    if (events) {
      this.formHeader2.controls['area'].setValue(events);
    }
    // console.log(this.formHeader.value.area);
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
  changeType($event:any) {
    this.formHeader2.controls['area'].setValue('');
    this.formHeader2.controls['edad_desde'].setValue('');
    this.formHeader2.controls['edad_hasta'].setValue('');
    this.formHeader2.controls['todos'].setValue(false);
    if ($event === 'edad') {
      this.formHeader2.controls['edad_desde'.toString()].setValidators([Validators.required]);
      this.formHeader2.controls['edad_desde'.toString()].updateValueAndValidity();

      this.formHeader2.controls['edad_hasta'.toString()].setValidators([Validators.required]);
      this.formHeader2.controls['edad_hasta'.toString()].updateValueAndValidity();

      this.formHeader2.controls['area'.toString()].setValidators([]);
      this.formHeader2.controls['area'.toString()].updateValueAndValidity();
    } else {
      this.formHeader2.controls['edad_desde'.toString()].setValidators([]);
      this.formHeader2.controls['edad_desde'.toString()].updateValueAndValidity();

      this.formHeader2.controls['edad_hasta'.toString()].setValidators([]);
      this.formHeader2.controls['edad_hasta'.toString()].updateValueAndValidity();

      this.formHeader2.controls['area'.toString()].setValidators([Validators.required]);
      this.formHeader2.controls['area'.toString()].updateValueAndValidity();
    }
  }
  changeTodos($event:any) {
    this.formHeader2.controls['area'].setValue('');
    if ($event) {
      this.formHeader2.controls['area'.toString()].setValidators([]);
      this.formHeader2.controls['area'.toString()].updateValueAndValidity();
    } else {
      this.formHeader2.controls['area'.toString()].setValidators([Validators.required]);
      this.formHeader2.controls['area'.toString()].updateValueAndValidity();
    }
  }
  getProgramNews() {
    const serviceName = END_POINTS.base_back.news + '/mis-programas';
    this.generalService.nameId$(serviceName, this.userService.user.id).subscribe((res: any) => {
      this.emploreAreas =  [new TreeviewItem(res.data)]
      // console.log(this.emploreAreas)
    })
  }
  getData(){
    const serviceName = 'inquiries';
    const data = {
      tabla: 'tutoria'
      
    }
    this.generalService.addNameData$(serviceName, data).subscribe(res => {
      if(res.success){
      }
    })
  }
}
