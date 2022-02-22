import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(https: HttpClient) {
  return new TranslateHttpLoader(https, 'assets/languages/i18n/', '.json');
}

const NGX_TRANSLATE: any[] = [
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient],
    }
  }),
]


@NgModule({
  declarations: [],
  imports: [...NGX_TRANSLATE],
  exports: [...NGX_TRANSLATE],
  providers: [],
})
export class TranslateLangModule { }
