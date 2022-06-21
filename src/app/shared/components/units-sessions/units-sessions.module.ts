import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MUnitSessionComponent } from './m-unit-session/m-unit-session.component';
import { VUnitSessionComponent } from './v-unit-session/v-unit-session.component';
import { NebularModule } from '../../nebular.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MUniSesComponent } from './v-unit-session/components/modals/m-uni-ses/m-uni-ses.component';

const COMPONENTS: any[] = [
  MUnitSessionComponent,
  VUnitSessionComponent,
  MUniSesComponent
];
const NG_MODULES: any = [
  NebularModule,
];
const PIPES: any = [
];
const MODULES:any = [
  DragDropModule,
]
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...NG_MODULES,
    ...PIPES,
    ...MODULES
  ],
  exports: [...COMPONENTS]
})

export class UnitsSessionsModule { }
