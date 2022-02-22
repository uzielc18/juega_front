import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound.component';
import { NebularModule } from '../../shared/nebular.module';
import { NotfoundHomeComponent } from './containers/notfound-home.component';
import { NotfoundRoutingModule } from './notfound-routing.module';



@NgModule({
  declarations: [
    NotfoundComponent,
    NotfoundHomeComponent
  ],
  imports: [
    CommonModule,
    NebularModule,
    NotfoundRoutingModule
  ]
})
export class NotfoundModule { }
