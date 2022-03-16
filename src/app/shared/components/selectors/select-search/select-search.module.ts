import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipeModule } from 'src/app/shared/pipes/filterPipe/filterPipe.module';
import { SelectSearchComponent } from './select-search.component';
import { NebularModule } from 'src/app/shared/nebular.module';

const COMPONENTS: any[] = [
  SelectSearchComponent
];
const NG_MODULES: any = [
  NebularModule,
];
const PIPES: any = [
  FilterPipeModule,
];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ...PIPES,
    ...NG_MODULES
  ]
})
export class SelectSearchModule { }
