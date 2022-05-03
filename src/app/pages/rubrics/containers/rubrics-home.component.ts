import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CreateRubricComponent } from '../components/create-rubric/create-rubric.component';

@Component({
  selector: 'app-rubrics-home',
  templateUrl: './rubrics-home.component.html',
  styleUrls: ['./rubrics-home.component.scss'],
})
export class RubricsHomeComponent implements OnInit {
  @Output() changeEmit: EventEmitter<any> = new EventEmitter();

  constructor(private dialogService: NbDialogService) {}

  ngOnInit() {}

  createRubric() {
    this.dialogService
      .open(CreateRubricComponent, {
        dialogClass: 'dialog-limited-height',
        context: {},
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        if (result === 'ok') {
          this.changeEmit.emit();
        }
      });
  }
}
