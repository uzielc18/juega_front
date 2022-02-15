import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbIconModule } from '@nebular/theme';
import { QAddComponent } from './q-add.component';

const COMPONENTS: any = [
  QAddComponent
]

const NEBULAR: any = [
  NbButtonModule,
  NbIconModule
]
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...NEBULAR,
    CommonModule
  ],
  exports: [...COMPONENTS]
})
export class QAddModule { }
