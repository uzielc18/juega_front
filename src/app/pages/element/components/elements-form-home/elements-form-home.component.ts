import { Component, Input, IterableDiffers, OnInit } from '@angular/core';
import { AppService } from '../../../../core';

@Component({
  selector: 'app-elements-form-home',
  templateUrl: './elements-form-home.component.html',
  styleUrls: ['./elements-form-home.component.scss'],
})
export class ElementsFormHomeComponent implements OnInit {

  // el destino[] tiene que ser obserbable
  @Input() destino: any[] = [];

  iterableDiffer: any = IterableDiffers;

  element: any;
  userInfo: any;
  code: any = 'NEW';
  type: any = 'MANY';

  loading: boolean = false;

  constructor(private userService: AppService) {
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userInfo = this.userService.user;
  }

  selectedElement($element: any) {
    this.element = $element;
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
