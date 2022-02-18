import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';

@Component({
  selector: 'app-config-zoom',
  templateUrl: './config-zoom.component.html',
  styleUrls: ['./config-zoom.component.scss']
})
export class ConfigZoomComponent implements OnInit {
  loading: boolean = false;
  @Input() datos:any;
  formHeader: any = FormGroup;
  zoomMeets:any;
  constructor(public activeModal: NbDialogRef<ConfigZoomComponent>, private generalServi: GeneralService,  private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fieldReactive();
    this.getZoomMeetings();
  }
  private fieldReactive() {
    const controls = {
      id: ['', [Validators.required]],
      clave: ['', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
  }
  closeModal() {
    this.activeModal.close('close');
  }
  getZoomMeetings() {
    const serviceName = 'zoomMeetings';
    this.loading = true;
    this.generalServi.nameId$(serviceName, this.datos.id).subscribe((res:any) => {
      this.zoomMeets = res.data || '';
    }, () => {this.loading = false}, () => {this.loading = false});
  }
  zoomOperator() {
    const serviceName = 'zoom-operator';
    const ids = this.datos;
    this.loading = true;
    this.generalServi.nameAll$(serviceName).subscribe((res:any) => {
      // this.listCourseZoom = res.data || [];
    }, () => {this.loading = false}, () => {this.loading = false});
  }

}
