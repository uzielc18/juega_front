import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NbMenuItem } from '@nebular/theme';
import { TrabajoModalComponent } from '../../trabajo-modal/trabajo-modal.component';

@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.scss'],
})
export class TrabajoComponent implements OnInit {

  constructor(private dialogService: NbDialogService) {}

  ngOnInit(): void {}

  open() {
    this.dialogService.open(TrabajoModalComponent, {
      dialogClass: 'dialog-limited-height',
    });
  }

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

  selectedItem = '0';
}
