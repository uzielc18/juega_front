import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuElementsChildComponent } from './menu-elements-child.component';
import { GeneralService } from 'src/app/providers';
import { NbCardModule, NbIconModule, NbSpinnerModule, NbTooltipModule } from '@nebular/theme';

const NB_MODULES: any = [
  NbIconModule,
  NbSpinnerModule, 
  NbCardModule
];

@NgModule({
  declarations: [MenuElementsChildComponent],
  imports: [CommonModule, ...NB_MODULES],
  exports: [MenuElementsChildComponent],
  providers: [GeneralService]
})
export class MenuElementsChildModule { }
