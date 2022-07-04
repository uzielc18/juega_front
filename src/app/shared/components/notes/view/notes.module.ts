import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import {NebularModule} from "../../../nebular.module";
import { MActivitiesComponent } from './components/modals/m-activities/m-activities.component';



@NgModule({
  declarations: [
    NotesComponent,
    MActivitiesComponent
  ],
  exports: [
    NotesComponent
  ],
  imports: [
    CommonModule,
    NebularModule
  ]
})
export class NotesModule { }
