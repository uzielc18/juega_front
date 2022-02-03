import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildrenCommentsComponent } from './children-comments.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSpinnerModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCommentForumComponent } from './edit-comment-forum/edit-comment-forum.component';
import { TranslateLangModule } from '../../moduls/translate-lang/translate-lang.module';
const ANGULAR: any[] = [CommonModule, FormsModule, ReactiveFormsModule];
@NgModule({
  declarations: [ChildrenCommentsComponent, EditCommentForumComponent],
  imports: [NbCardModule, NbInputModule, NbButtonModule, NbIconModule, NbSpinnerModule, TranslateLangModule, ...ANGULAR],
  exports: [ChildrenCommentsComponent],
})

export class ChildrenCommentsModule { }
