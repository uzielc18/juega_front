import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {END_POINTS} from "../../../../../../providers/utils";
import {GeneralService} from "../../../../../../providers";
import {TreeviewConfig, TreeviewI18n, TreeviewItem} from "ngx-treeview";
import {AppService} from "../../../../../../core";
import {DropdownTreeviewSelectI18n} from "../../../../../../shared/injectables/tree/dropdown-treeview-select-i18n";
import {NbDateService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
// @ts-ignore
import * as customEditer from '../../../../../../shared/ckCustomBuild/build/ckeditor';
@Component({
  selector: 'app-created-poll',
  templateUrl: './created-poll.component.html',
  styleUrls: ['./created-poll.component.scss'],
  providers: [
    { provide: TreeviewI18n, useClass: DropdownTreeviewSelectI18n }
  ]
})
export class CreatedPollComponent implements OnInit {

  recuperarId: any = this.activatedRoute.snapshot.paramMap.get('id');
  recuperar: any = this.activatedRoute.snapshot.paramMap;
  loading: boolean = false
  formHeader2: any = FormGroup;
  formHeader: any = FormGroup;
  disable: boolean = true;
  dataEdit: any;
  min: any = Date;
  emploreAreas: TreeviewItem[] = [];
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

  public Editor: any = customEditer;

  constructor(private formBuilder: FormBuilder,
              private generalService: GeneralService,
              private userService: AppService,
              dateService: NbDateService<Date>,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public datepipe: DatePipe) {

    let date: any = Date;
    date = dateService.today();
    this.min = dateService.addDay(date, 0);
  }

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
      tipoCE: ['tutoria', [Validators.required]],
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
    if (this.recuperarId) {
      this.setValue();
    }
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

  onSelectedChange(events: any) {
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

  changeType($event: any) {
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

  changeTodos($event: any) {
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
      this.emploreAreas = [new TreeviewItem(res.data)]
      // console.log(this.emploreAreas)
    })
  }

  back() {
    if (this.recuperarId) {
      this.router.navigate([`../../`], {relativeTo: this.activatedRoute});
    } else {
      this.router.navigate([`../`], {relativeTo: this.activatedRoute});
    }
  }

  getData() {
    const serviceName = 'inquiries';
    const data = {
      tabla: 'tutoria'

    }
    this.generalService.addNameData$(serviceName, data).subscribe(res => {
      if (res.success) {
      }
    })
  }

  newPoll() {
    const serviceName = 'inquiries';
    const inquiries_id = this.recuperarId
    const forms = this.formHeader2.value;
    const forms2 = this.formHeader.value;
    let filtros = '';
    if (forms.tipo_filtro === 'edad') {
      filtros = forms.edad_desde + '-' + forms.edad_hasta
    }
    if (forms.tipo_filtro === 'area' && forms.todos === false) {
      filtros = forms.area.join(',');
    }
    if (forms.tipo_filtro === 'area' && forms.todos === true) {
      filtros = 'all';
    }
    const params = {
      titulo: forms.titulo,
      fecha_inicio: this.datepipe.transform(forms.fecha_inicio, 'yyyy-MM-dd'),
      fecha_fin: this.datepipe.transform(forms.fecha_fin, 'yyyy-MM-dd'),
      consulta: forms.contenido,
      mostrar: 'publico',
      tabla: forms.tipoCE,
      tabla_id: 0,
      person_id: this.userService?.user?.person?.id,
      codigo: filtros,
      url_video: forms2.url_externa,
      titulo_video: forms2.titulo,
      descripcion_video: forms2.descripcion
    }
    if (this.recuperarId) {
      this.loading = true;
      this.generalService.updateNameIdData$(serviceName, inquiries_id, params).subscribe((res: any) => {
        if (res.success) {
          this.back();
        }
      }, () => {
        this.loading = false
      }, () => {
        this.loading = false
      });
    } else {
      this.loading = true;
      this.generalService.addNameData$(serviceName, params).subscribe((res: any) => {
        if (res.success) {
          this.back();
        }
      }, () => {
        this.loading = false
      }, () => {
        this.loading = false
      });
    }
  }
  renderDate(date: any) {
    if (date) {
      const fecha = date.split('-');
      var n = new Date(`${fecha[0]}-${fecha[1]}-${fecha[2]}`);
      n.setMinutes(n.getMinutes() + n.getTimezoneOffset()); //para solucionar la diferencia de minutos
      if (n.getDate()) {
        return n;
      } else {
        return '';
      }
    }
    return '';
  }
  setValue() {
    const serviceName = 'inquiries';
    const inquiries_id = this.recuperarId
    this.generalService.nameId$(serviceName, inquiries_id).subscribe(res => {
      this.dataEdit = res.data;
      this.formHeader.patchValue({
        url_externa: this.dataEdit.url_video,
        titulo: this.dataEdit.titulo_video,
        descripcion: this.dataEdit.descripcion_video,
      })
      this.formHeader2.patchValue({
        titulo: this.dataEdit.titulo,
        tipo_filtro: this.dataEdit.codigo === 'all' ? 'area' : 'edad',
        publicar: true,
        tipoCE: this.dataEdit.tabla,
        todos: this.dataEdit.codigo === 'all' ? true : false,
        edad_desde: this.dataEdit.titulo,
        edad_hasta: this.dataEdit.titulo,
        fecha_inicio: this.renderDate(this.dataEdit.fecha_inicio),
        fecha_fin: this.renderDate(this.dataEdit.fecha_fin),
        area: this.dataEdit.titulo,
        contenido: this.dataEdit.consulta,
      })
    })
  }

}
 /* onReady(eventData: any) {
    eventData.plugins.get('FileRepository').createUploadAdapter = function (loader: any) {
      console.log('loader : ', loader)
      console.log(btoa(loader.file));
      return new UploadAdapter(loader);
    };
  }
}
export class UploadAdapter {
  private loader;
  constructor( loader: any ) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file
      .then( (file: any) => new Promise( ( resolve, reject ) => {
        var myReader= new FileReader();
        myReader.onloadend = (e) => {
          resolve({ default: myReader.result });
        }

        myReader.readAsDataURL(file);
      } ) );
  };
}*/
