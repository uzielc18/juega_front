import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDateService, NbDialogService } from '@nebular/theme';
import { TreeviewConfig, TreeviewI18n, TreeviewItem } from 'ngx-treeview';
import { AppService } from 'src/app/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { PreviewNewsComponent } from 'src/app/shared/components/news-comp/preview-news/preview-news.component';
import { DIRECTORY } from 'src/app/shared/directorios/directory';
import { DropdownTreeviewSelectI18n } from 'src/app/shared/injectables/tree/dropdown-treeview-select-i18n';

@Component({
  selector: 'app-created-news',
  templateUrl: './created-news.component.html',
  styleUrls: ['./created-news.component.scss'],
  providers: [
    { provide: TreeviewI18n, useClass: DropdownTreeviewSelectI18n }
  ]
})
export class CreatedNewsComponent implements OnInit {
  loading: boolean = false;
  formHeader: any = FormGroup;
  min: any = Date;
  emploreAreas: TreeviewItem[] =  [new TreeviewItem({
    text: 'IT', value: 9, children: [
      {
        text: 'Programming', value: 91, children: [{
          text: 'Frontend', value: 911, children: [
            { text: 'Angular 1', value: 9111 },
            { text: 'Angular 2', value: 9112 },
            { text: 'ReactJS', value: 9113, disabled: true }
          ]
        }, {
          text: 'Backend', value: 912, children: [
            { text: 'C#', value: 9121 },
            { text: 'Java', value: 9122 },
            { text: 'Python', value: 9123, checked: false, disabled: true }
          ]
        }]
      },
      {
        text: 'Networking', value: 92, children: [
          { text: 'Internet', value: 921 },
          { text: 'Security', value: 922 }
        ]
      }
    ]
  })];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 250,
  });
  buttonClasses = [
    'btn-outline-light btn-sm',
  ];
  buttonClass = this.buttonClasses[0];
  directorio = DIRECTORY.news;
  key_file: any;
  constructor(private formBuilder: FormBuilder, dateService: NbDateService<Date>, public datepipe: DatePipe, private service: GeneralService,
    private userService: AppService, private dialogService: NbDialogService, private router: Router, private activatedRoute: ActivatedRoute) {
    let date:any = Date;
        date = dateService.today();
        this.min = dateService.addDay(date, 0);
   }

   ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      url: [''],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      publicar: [false],
      todos: [false],
      area: [''],
      mostrar_boton: [false],
      nombre_boton: [''],
      contenido: ['', [Validators.required]],
      tipo_filtro: ['', [Validators.required]],
      edad_desde: [''],
      edad_hasta: [''],
      imagen: ['', [Validators.required]],
      base64_url: ['', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.key_file = this.userService?.user?.person?.codigo;
  }
  fechaIn($event:any) {
    this.formHeader.controls['fecha_inicio'].setValue($event);
  }
  fechaF($event:any) {
    this.formHeader.controls['fecha_fin'].setValue($event);
  }
  keyFechaIni($event:any) {
    if ($event && !$event.target['value']) {
      this.formHeader.controls['fecha_inicio'].setValue('');
    }
  }
  fFinKey($event:any) {
    if ($event && !$event.target['value']) {
      this.formHeader.controls['fecha_fin'].setValue('');
    }
  }
  changeMBoton($event:any) {
    // console.log($event);
    this.formHeader.controls['nombre_boton'].setValue('');
    this.formHeader.controls['url'].setValue('');

    if ($event) {
      this.formHeader.controls['nombre_boton'.toString()].setValidators([Validators.required]);
      this.formHeader.controls['nombre_boton'.toString()].updateValueAndValidity();

      this.formHeader.controls['url'.toString()].setValidators([Validators.required]);
      this.formHeader.controls['url'.toString()].updateValueAndValidity();

    } else {

      this.formHeader.controls['nombre_boton'.toString()].setValidators([]);
      this.formHeader.controls['nombre_boton'.toString()].updateValueAndValidity();

      this.formHeader.controls['url'.toString()].setValidators([]);
      this.formHeader.controls['url'.toString()].updateValueAndValidity();

    }
  }
  onSelectedChange(events:any){
    if (events) {
      this.formHeader.controls['area'].setValue(events);
    }
    console.log(this.formHeader.value.area);
  }
  saveNews() {
    const serviceName = END_POINTS.base_back.news + '/news';
    const forms = this.formHeader.value;
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
      url: forms.url,
      fecha_inicio: this.datepipe.transform(forms.fecha_inicio, 'yyyy-MM-dd'),
      fecha_fin: this.datepipe.transform(forms.fecha_fin, 'yyyy-MM-dd'),
      publicar: forms.publicar === true ? 1 : 0,
      mostrar_boton: forms.mostrar_boton === true ? 1 : 0,
      nombre_boton: forms.nombre_boton,
      contenido: forms.contenido,
      typeFiltro: forms.tipo_filtro,
      filtro: filtros,
      imagen: forms.imagen,
    }
    // console.log(params);
    this.loading = true;
    this.service.addNameData$(serviceName, params).subscribe((res:any) => {
      if (res.success) {
        this.back();
      }
    }, () => {this.loading = false}, ()=> {this.loading=false});

  }
  changeType($event:any) {
    this.formHeader.controls['area'].setValue('');
    this.formHeader.controls['edad_desde'].setValue('');
    this.formHeader.controls['edad_hasta'].setValue('');
    this.formHeader.controls['todos'].setValue(false);
    if ($event === 'edad') {
      this.formHeader.controls['edad_desde'.toString()].setValidators([Validators.required]);
      this.formHeader.controls['edad_desde'.toString()].updateValueAndValidity();

      this.formHeader.controls['edad_hasta'.toString()].setValidators([Validators.required]);
      this.formHeader.controls['edad_hasta'.toString()].updateValueAndValidity();

      this.formHeader.controls['area'.toString()].setValidators([]);
      this.formHeader.controls['area'.toString()].updateValueAndValidity();
    } else {
      this.formHeader.controls['edad_desde'.toString()].setValidators([]);
      this.formHeader.controls['edad_desde'.toString()].updateValueAndValidity();

      this.formHeader.controls['edad_hasta'.toString()].setValidators([]);
      this.formHeader.controls['edad_hasta'.toString()].updateValueAndValidity();

      this.formHeader.controls['area'.toString()].setValidators([Validators.required]);
      this.formHeader.controls['area'.toString()].updateValueAndValidity();
    }
  }
  changeTodos($event:any) {
    this.formHeader.controls['area'].setValue('');
    if ($event) {
      this.formHeader.controls['area'.toString()].setValidators([]);
      this.formHeader.controls['area'.toString()].updateValueAndValidity();
    } else {
      this.formHeader.controls['area'.toString()].setValidators([Validators.required]);
      this.formHeader.controls['area'.toString()].updateValueAndValidity();
    }
  }
  fileResult($event:any) {
    this.formHeader.controls['imagen'].setValue('');
    this.formHeader.controls['base64_url'].setValue('');
    if ($event && $event.archivo) {
      this.formHeader.controls['imagen'].setValue($event.nombre);
      this.formHeader.controls['base64_url'].setValue($event.base64);
    }
  }
  openPreviewFile() {
      this.dialogService.open(PreviewNewsComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          valuess: this.formHeader.value,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false
      }).onClose.subscribe(result => {
        if (result === 'ok') {
        }
      });
  }
  back() {
    this.router.navigate([`../`], { relativeTo: this.activatedRoute });
  }
}
