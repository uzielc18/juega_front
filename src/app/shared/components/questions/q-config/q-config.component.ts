import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { DIRECTORY } from 'src/app/shared/directorios/directory';
import { MProcessUrlComponent } from './modals/m-process-url/m-process-url.component';

@Component({
  selector: 'app-q-config',
  templateUrl: './q-config.component.html',
  styleUrls: ['./q-config.component.scss']
})
export class QConfigComponent implements OnInit {
  @Input() item:any
  @Input() userInfo:any
  directorio: any = DIRECTORY.base;
  arrayFile: any = [];
  formHeader: any = FormGroup;
  formHeaderLink: any = FormGroup;
  formHeaderFile: any = FormGroup;
  optionsType:any = [
    {
      nombre: 'Pregunta cerrada',
      id: 1,
      typex: 'PC',
      color: 'red',
      icon: 'arrow-left-outline',
      checked: false,
    },
    {
      nombre: 'Pregunta abierta',
      id: 1,
      typex: 'PA',
      color: 'blue',
      icon: 'mic-outline',
      checked: false,
    },
    {
      nombre: 'Pregunta multiple opción',
      id: 1,
      typex: 'PMO',
      color: 'black',
      icon: 'gift-outline',
      checked: false,
    },
    {
      nombre: 'Pregunta relación',
      id: 1,
      typex: 'PR',
      color: 'yellow',
      icon: 'clipboard-outline',
      checked: false,
    },
    {
      nombre: 'Pregunta verdadero o falso',
      id: 1,
      typex: 'PVF',
      color: 'green',
      icon: 'award-outline',
      checked: false,
    },
    {
      nombre: 'Pregunta única opción',
      id: 1,
      typex: 'PUO',
      color: 'red',
      icon: 'activity-outline',
      checked: false,
    }
  ]
  key_file:any;
  constructor(private formBuilder: FormBuilder, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.fieldReactive();
    this.fieldReactiveLink();
    this.fieldReactiveFile();
  }
  private fieldReactiveLink() {
    const controls = {
      url_externa: ['', [Validators.required]],
      tamano_peso: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      key_video: ['', [Validators.required]],
    };
    this.formHeaderLink = this.formBuilder.group(controls);
  }
  private fieldReactiveFile() {
    const controls = {
      file: ['', [Validators.required]],
    };
    this.formHeaderFile = this.formBuilder.group(controls);
  }
  private fieldReactive() {
    const controls = {
      pregunta: ['', [Validators.required]],
      tipo_adjunto: ['']
    };
    this.formHeader = this.formBuilder.group(controls);
    this.key_file = this.item?.id_carga_curso_docente + '_' + this.userInfo?.person?.codigo + '_' + Math.floor(Math.random() * 90000) + 10000;
  }
  valueFile($event:any) {
    if ($event && $event.value) {
      this.formHeader.controls['tipo_adjunto'].setValue('ARCHIVO');
      this.formHeaderFile.controls['file'].setValue($event.value);

      this.fieldReactiveLink();
    } else {
      this.formHeaderFile.controls['file'].setValue('');
    }
  }
  changeButtom(item:any) {
    if (this.optionsType.length>0) {
      this.optionsType.map((res:any) => {
        res.checked = false;
      });
      item.checked = true;
    }
  }
  openUrlYoutube() {
    this.dialogService.open(MProcessUrlComponent, {
      dialogClass: 'dialog-limited-height',
      context: {},
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result && result.close === 'ok') {
        this.formHeader.controls['tipo_adjunto'].setValue('URL');

        this.formHeaderLink.patchValue({
          url_externa: result.value.url_externa,
          tamano_peso: result.value.tamano_peso,
          titulo: result.value.titulo,
          descripcion: result.value.descripcion,
          key_video: result.value.key_video,
        });

        this.fieldReactiveFile();
      }
    });
  }
  deleteFile() {
    this.fieldReactiveFile();
    this.formHeader.controls['tipo_adjunto'].setValue('');
  }
  deleteLink() {
    this.fieldReactiveLink();
    this.formHeader.controls['tipo_adjunto'].setValue('');
  }
}
