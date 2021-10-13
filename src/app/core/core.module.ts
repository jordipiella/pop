import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { httpLoaderFactory } from '../utils/http-loader.factory';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ModalComponent } from './modal/modal.component';
import * as fromFavorites from './state/favorites/favorites.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FavoritesEffects } from './state/favorites/favorites.effects';

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
    AngularSvgIconModule,
    StoreModule.forFeature(fromFavorites.favoritesFeatureKey, fromFavorites.reducer),
    EffectsModule.forFeature([FavoritesEffects]),
  ],
  exports: [
    HeaderComponent,
    ModalComponent
  ]
})
export class CoreModule { }
