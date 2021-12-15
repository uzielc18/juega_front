import { Component } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-adjuntar-docs',
  templateUrl: './adjuntar-docs.component.html',
  styleUrls: ['./adjuntar-docs.component.scss'],
})
export class AdjuntarDocsComponent {
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
}
