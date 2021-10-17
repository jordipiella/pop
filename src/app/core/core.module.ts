import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { httpLoaderFactory } from '../utils/http-loader.factory';
import { AngularSvgIconModule } from 'angular-svg-icon';
import * as fromFavorites from './state/favorites/favorites.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FavoritesEffects } from './state/favorites/favorites.effects';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ModalComponent } from './modal/modal.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    ModalComponent,
    ClickOutsideDirective
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
    AngularSvgIconModule,
    StoreModule.forFeature(fromFavorites.favoritesFeatureKey, fromFavorites.reducer),
    EffectsModule.forFeature([FavoritesEffects])
  ],
  exports: [
    HeaderComponent,
    ModalComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true  }
  ]
})
export class CoreModule { }
