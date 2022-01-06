import { Component, Input } from '@angular/core';
import { NbDialogRef, NbMenuItem, NbSidebarService } from '@nebular/theme';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-homework',
  templateUrl: './homework-form.component.html',
  styleUrls: ['./homework-form.component.scss'],
})
export class HomeworkFormComponent {
  @Input() sesion: any;
  element: any;

  constructor(public activeModal: NbDialogRef<HomeworkFormComponent>) {}
  ngOnInit(): void {
    console.log(this.sesion, 'eeeeeeeeee');
  }
  closeModal() {
    this.activeModal.close('close');
  }
  saveValue($event: any) {
    if ($event === 'ok') {
      this.activeModal.close('ok');
    } else {
      this.activeModal.close('close');
    }
  }
  selectedElement($element: any) {
    this.element = $element;
    console.log($element, 'seleccionado');
  }
}
