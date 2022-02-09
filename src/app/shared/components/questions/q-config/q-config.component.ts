import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { DIRECTORY } from 'src/app/shared/directorios/directory';
import { MProcessUrlComponent } from './modals/m-process-url/m-process-url.component';

@Component({
  selector: 'app-q-config',
  templateUrl: './q-config.component.html',
  styleUrls: ['./q-config.component.scss']
})
export class QConfigComponent implements OnInit {
  @Input() item:any;
  @Input() userInfo:any;
  directorio: any = DIRECTORY.base;
  arrayFile: any = [];
  formHeader: any = FormGroup;
  loading: boolean = false;
  optionsType:any = [];
  key_file:any;
  questions:any = [];
  constructor(private formBuilder: FormBuilder, private dialogService: NbDialogService, private generalServi: GeneralService) { }

  ngOnInit(): void {
    this.fieldReactive();
    this.getQuestions();
  }

  private fieldReactive() {
    const controls = {
      pregunta: ['', [Validators.required]],
      tipo_adjunto: [''],
      help: [''],
      orden: [''],

      url_video: [''],
      key_video: [''],

      adjunto: [''],
      file: [''],

      estado: ['1'],
      type_alternative: ['']
    };
    this.formHeader = this.formBuilder.group(controls);
    this.key_file = this.item?.id_carga_curso_docente + '_' + this.userInfo?.person?.codigo + '_' + Math.floor(Math.random() * 90000) + 10000;
    this.getTypeAlternative();
  }
  getQuestions() {
    const serviceName = END_POINTS.base_back.quiz + '/get-questions';
    if (this.item && this.item.exam && this.item.exam.id) {
      this.loading = true;
      this.generalServi.nameId$(serviceName, this.item.exam.id).subscribe(r => {
        this.questions = r.data || [];
        if (this.questions.length> 0) {
          this.questions.map((r:any) => {
            r.checked = false;
            r.pluss = false;
            if (r.nivel === '1') {
              r.section_id = r.id;
            }
          });
        }
      }, () => { this.loading = false; }, () => { this.loading  = false; });
      }
  }

  changeValueCheck(item:any) {
    this.questions.map((r:any) => {
      r.checked = false;
    });
      item.checked = true;
  }

  changePluss(item:any) {
    this.questions.map((r:any) => {
      r.pluss = false;
    });
      item.pluss = true;
  }

  getTypeAlternative() {
    const serviceName = END_POINTS.base_back.quiz + '/typeAlternatives';
      this.loading = true;
      this.generalServi.nameAll$(serviceName).subscribe(r => {
        this.optionsType = r.data || [];
        if (this.optionsType.length > 0) {
          this.optionsType.map((r:any) => {
            r.icon = 'keypad-outline';
            r.checked = false;
            r.color = '#934054'
          })
        }
      }, () => { this.loading = false; }, () => { this.loading  = false; });
  }

  valueFile($event:any) {
    if ($event && $event.value) {
      this.formHeader.controls['tipo_adjunto'].setValue('ARCHIVO');
      this.formHeader.controls['adjunto'].setValue($event.value.nombre_s3);
      this.formHeader.controls['file'].setValue($event.value);

      this.formHeader.controls['url_video'].setValue('');
      this.formHeader.controls['key_video'].setValue('');

    } else {
      this.formHeader.controls['file'].setValue('');
      this.formHeader.controls['adjunto'].setValue('');
    }
  }
  changeButtom(item:any) {
    if (this.optionsType.length>0) {
      this.optionsType.map((res:any) => {
        res.checked = false;
      });
      item.checked = true;
      this.formHeader.controls['type_alternative'].setValue(item);

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

        this.formHeader.controls['url_video'].setValue(result.value.url_externa);
        this.formHeader.controls['key_video'].setValue(result.value.key_video);

        this.formHeader.controls['adjunto'].setValue('');
        this.formHeader.controls['file'].setValue('');
      }
    });
  }
  deleteFile() {
    this.formHeader.controls['adjunto'].setValue('');
    this.formHeader.controls['file'].setValue('');

    this.formHeader.controls['tipo_adjunto'].setValue('');
  }
  deleteLink() {
    this.formHeader.controls['url_video'].setValue('');
    this.formHeader.controls['key_video'].setValue('');

    this.formHeader.controls['tipo_adjunto'].setValue('');
  }

  changeLoadings($event: boolean) {
    setTimeout(() => {
      this.loading = $event;
    }, 1000);
  }
  changeSuccess($event:any) {
    setTimeout(() => {
      if ($event === 'ok') {
        this.getQuestions();
        this.fieldReactive();
      }
    }, 100);
  }
}
