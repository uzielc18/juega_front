import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AppService } from 'src/app/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

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
  itemsValue: any;
  userInfo: any;
  constructor(private userService: AppService, public activeModal: NbDialogRef<HomeworkFormComponent>,  private generalServi: GeneralService) {

  }
  ngOnInit(): void {
    if (this.code === 'UPDATE') {
      this.setValueElementUpdate();
    }
    this.getUserInfo();
  }
  closeModal() {
    const valueClose = {
      value_close: 'close',
      value: '',
    }
    this.activeModal.close(valueClose);
  }
  getUserInfo() {
    this.userInfo = this.userService.user;
  }
  saveValue($event: any){
    if ($event.value_close === 'ok') {
      this.activeModal.close($event);
    } else {
      this.closeModal();
    }
  }
  selectedElement($element: any) {
    this.element = $element;
    // console.log($element, 'seleccionado');
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
  setValueElementUpdate() {
    const serviceName = END_POINTS.base_back.elements;
    if (this.item.id) {
      this.loading = true;
      this.generalServi.nameId$(serviceName, this.item.id).subscribe(r => {
        const data = r.data || '';
        if (data) {
          this.element = data.type_element;
          this.itemsValue = data;
        }
      }, () => { this.loading = false; }, () => { this.loading  = false; });
    }
  }
}
