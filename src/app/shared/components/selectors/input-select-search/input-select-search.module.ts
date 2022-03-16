import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSelectSearchComponent } from './input-select-search.component';
import { NebularModule } from 'src/app/shared/nebular.module';
import { FilterPipeModule } from 'src/app/shared/pipes/filterPipe/filterPipe.module';

const COMPONENTS: any[] = [
  InputSelectSearchComponent
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
    ...NG_MODULES,
    ...PIPES,
  ],
  exports: [InputSelectSearchComponent]
})
export class InputSelectSearchModule { }
