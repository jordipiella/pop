import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { httpLoaderFactory } from '../utils/http-loader.factory';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ModalComponent
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
    AngularSvgIconModule
  ],
  exports: [
    HeaderComponent,
    ModalComponent
  ]
})
export class CoreModule { }
