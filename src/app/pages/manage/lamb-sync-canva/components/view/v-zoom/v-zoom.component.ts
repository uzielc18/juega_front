import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-v-zoom',
  templateUrl: './v-zoom.component.html',
  styleUrls: ['./v-zoom.component.scss']
})
export class VZoomComponent implements OnInit {

  @Input() formHeader: any;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
