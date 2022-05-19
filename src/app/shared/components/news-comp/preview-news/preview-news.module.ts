import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NebularModule } from 'src/app/shared/nebular.module';
import { PreviewNewsComponent } from './preview-news.component';

const COMPONENTS: any = [
  PreviewNewsComponent
]
const MODALS: any = [
  PreviewNewsComponent
]
const MODULES: any = [
]

const NEBULAR: any = [
  NebularModule
]

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    ...MODULES,
    ...NEBULAR
  ],
  entryComponents: [...MODALS],
  exports: [PreviewNewsComponent]
})

export class PreviewNewsModule { }
