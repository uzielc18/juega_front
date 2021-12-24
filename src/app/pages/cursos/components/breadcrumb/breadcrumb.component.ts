import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppService } from '../../../../core/state/app.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  roles: string[] = [];
  @Output() role = new EventEmitter<string>();

  constructor(private userRole: AppService) {}

  ngOnInit(): void {
    for (let i = 0; i < this.userRole.user.roles.length; i++) {
      this.roles.push(this.userRole.user.roles[i].name);
    }
  }

  selectedSemester = '0';
  selectedRole = '0';

  selecionar(event: any) {
    console.log('hola desde el breadcrumb', event);
    this.role.emit(event);
  }
}
