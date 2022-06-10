import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound.component';
import { NebularModule } from '../../shared/nebular.module';
import { NotfoundHomeComponent } from './containers/notfound-home.component';
import { NotfoundRoutingModule } from './notfound-routing.module';
import { SvgImageComponent } from './components/svg-image/svg-image.component';



@NgModule({
  declarations: [
    NotfoundComponent,
    NotfoundHomeComponent,
    SvgImageComponent
  ],
  imports: [
    CommonModule,
    NebularModule,
    NotfoundRoutingModule
  ]
})
export class NotfoundModule { }
