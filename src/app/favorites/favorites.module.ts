import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpLoaderFactory } from 'src/app/utils/http-loader.factory';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FavoritesComponent } from './favorites.component';
import { FavoriteCardComponent } from './components/favorite-card/favorite-card.component';


@NgModule({
  declarations: [
    FavoritesComponent,
    FavoriteCardComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule,
    AngularSvgIconModule,
    ReactiveFormsModule
  ],
  providers: [
    FormBuilder
  ],
  exports: [
    FavoritesComponent
  ],
  bootstrap: [FavoritesComponent]
})
export class FavoritesModule { }
