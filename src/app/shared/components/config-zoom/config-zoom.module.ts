import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigZoomComponent } from './config-zoom.component';
import { NebularModule } from '../../nebular.module';

const COMPONENTS: any[] = [
  ConfigZoomComponent
];
const NB_MODULES: any = [
  NebularModule,
];
const PIPES: any = [
];
const NG_MODULES: any = [
  
]
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...NB_MODULES,
    ...PIPES,
    ...NG_MODULES,
  ],
  exports: [ConfigZoomComponent]
})
export class ConfigZoomModule { }
