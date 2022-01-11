import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuElementsComponent } from './menu-elements.component';
import { NbIconModule } from '@nebular/theme';

@NgModule({
  declarations: [MenuElementsComponent],
  imports: [CommonModule, NbIconModule],
  exports: [MenuElementsComponent],
})
export class MenuElementsModule {}
