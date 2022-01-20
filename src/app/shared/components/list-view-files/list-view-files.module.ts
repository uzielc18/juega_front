import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewFilesComponent } from './list-view-files.component';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbSpinnerModule } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { MViewFilesModule } from '../view-files/m-view-files/m-view-files.module';
const NG_MODULES: any = [
  NbCardModule,
  NbButtonModule,
  NbDialogModule.forChild(),
  NbInputModule,
  NbSpinnerModule,
  NbIconModule,
];
@NgModule({
  declarations: [ListViewFilesComponent],
  imports: [CommonModule, ...NG_MODULES, MViewFilesModule],
  exports: [ListViewFilesComponent],
  providers: [GeneralService],
  entryComponents: []
})

export class ListViewFilesModule { }
