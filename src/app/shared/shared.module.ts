import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpLoaderFactory } from '../utils/http-loader.factory';
import { ButtonComponent } from './button/button.component';
import { GridComponent } from './grid/grid.component';


@NgModule({
  declarations: [
    CardComponent,
    ButtonComponent,
    GridComponent
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
  ],
  exports: [
    CardComponent,
    ButtonComponent,
    GridComponent
  ]
})
export class SharedModule { }
