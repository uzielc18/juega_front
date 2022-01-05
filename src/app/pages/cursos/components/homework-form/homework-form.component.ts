import { Component, Input } from '@angular/core';
import { NbDialogRef, NbMenuItem, NbSidebarService } from '@nebular/theme';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-homework',
  templateUrl: './homework-form.component.html',
  styleUrls: ['./homework-form.component.scss'],
})
export class HomeworkFormComponent {
  items: NbMenuItem[] = [
    {
      title: 'Trabajo',
      icon: 'list-outline',
    },
    {
      title: 'Video conferencia',
      icon: 'video-outline',
    },
    {
      title: 'Clases grabadas',
      icon: 'folder-add-outline',
    },
    {
      title: 'Foro',
      icon: 'message-circle-outline',
    },
    {
      title: 'Enlace externo',
      icon: 'external-link-outline',
    },
    {
      title: 'Video compartido',
      icon: 'play-circle-outline',
    },
    {
      title: 'Evaluación',
      icon: 'checkmark-circle-outline',
    },
  ];
  @Input() topics: any;
  @Input() unidad: any;
  @Input() curso: any;
  constructor(public activeModal: NbDialogRef<HomeworkFormComponent>) {

  }
  ngOnInit(): void {
    console.log(this.topics, 'eeeeeeeeee', this.unidad, 'ooooo', this.curso);

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
}
