import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NebularModule } from '../../shared/nebular.module';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './contents/login/login.component';
@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, NebularModule, AuthRoutingModule],
})
export class AuthModule {}
