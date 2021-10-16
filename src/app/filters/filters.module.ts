import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { httpLoaderFactory } from 'src/app/utils/http-loader.factory';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FiltersComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    FiltersComponent
  ]
})
export class FiltersModule { }
