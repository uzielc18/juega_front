import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-form-homework',
  templateUrl: './homework-form.component.html',
  styleUrls: ['./homework-form.component.scss'],
})
export class HomeworkFormComponent {
  @Input() topics: any;
  @Input() unidad: any;
  @Input() curso: any;

  @Input() item: any;
  @Input() code: any;

  loading: boolean = false;
  element:any;
  constructor(public activeModal: NbDialogRef<HomeworkFormComponent>) {

  }
  ngOnInit(): void {
  }
  closeModal() {
    this.activeModal.close('close');
  }
  saveValue($event: any){
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
  loadingsMenu($event: boolean) {
    setTimeout(() => {
      this.loading = $event;
    }, 100);
  }
  loadingsForm($event: boolean) {
    setTimeout(() => {
      this.loading = $event;
    }, 100);
  }
}
