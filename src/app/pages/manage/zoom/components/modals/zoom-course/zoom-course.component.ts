import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { ConfigZoomComponent } from './config-zoom/config-zoom.component';

@Component({
  selector: 'app-zoom-course',
  templateUrl: './zoom-course.component.html',
  styleUrls: ['./zoom-course.component.scss']
})
export class ZoomCourseComponent implements OnInit {
  loading: boolean = false;
  @Input() item:any;
  formHeader: any = FormGroup;
  listCourseZoom:any = [];
  constructor(public activeModal: NbDialogRef<ZoomCourseComponent>, private generalServi: GeneralService, private formBuilder: FormBuilder,
    private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.fieldReactive();
    this.getCourseZoom();
  }
  private fieldReactive() {
    const controls = {
      id_escuela: [''],
      ciclo: [''],
    };
    this.formHeader = this.formBuilder.group(controls);
  }
  closeModal() {
    this.activeModal.close('close');
  }
  openConfig(items:any) {
    this.dialogService.open(ConfigZoomComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        datos: items,

      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        // this.filtrar();
      }
    });
  }
  getCourseZoom() {
    const serviceName = 'zoomMeetings';
    this.loading = true;
    this.generalServi.nameAll$(serviceName).subscribe((res:any) => {
      this.listCourseZoom = res.data || [];
    }, () => {this.loading = false}, () => {this.loading = false});
  }

}
