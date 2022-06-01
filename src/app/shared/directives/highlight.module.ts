import { NgModule } from '@angular/core';
import { ClickOutsideDirective } from './clickOutside.directive';
import { HighlightDirective } from './highlight.directive';

const DIRECTIVES: any = [
  HighlightDirective,
  ClickOutsideDirective,
]

@NgModule({
  declarations: [...DIRECTIVES],
  imports: [],
  exports: [...DIRECTIVES],
})
export class DirectiveModule {}
