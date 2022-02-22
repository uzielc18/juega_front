import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NebularModule } from '../../nebular.module';
import { CardListCourseComponent } from './card-list-course.component';
import { TranslateLangModule } from '../../moduls/translate-lang/translate-lang.module';
import { EnterZoomComponent } from './enter-zoom/enter-zoom.component';

const ANGULAR: any[] = [CommonModule, FormsModule, ReactiveFormsModule];
@NgModule({
  declarations: [CardListCourseComponent, EnterZoomComponent],
  imports: [NebularModule, ...ANGULAR, TranslateLangModule],
  exports: [CardListCourseComponent],
})
export class CardListCourseModule { }
