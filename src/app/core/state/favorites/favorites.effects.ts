import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getFavoritesSuccess,
  getFavorites,
  addFavorite,
  addFavoriteSuccess,
  removeFavorite,
  removeFavoriteSuccess
} from './favorites.actions';
import { FavoriteModel } from '../../services/favorites/models/favorite.model';
import { FavoriteService } from '../../services/favorites/favorite.service';
import { AppFacade } from '../../services/app.facade';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class FavoritesEffects {

  loadFavorites$ = createEffect(() => this.actions$.pipe(
    ofType(getFavorites),
    map(() => this.favoritesService.favorites),
    map((favorites: FavoriteModel[]) => getFavoritesSuccess({ data: favorites })))
  );

  addFavorite$ = createEffect(() => this.actions$.pipe(
    ofType(addFavorite),
    map((favorite: { data: FavoriteModel[] }) => {
      if (favorite?.data?.length) {
        this.favoritesService.addFavorite(favorite.data[0]);
        this.successFavAlert('added');
      }
      return this.favoritesService.favorites;
    }),
    map((favorites: FavoriteModel[]) => addFavoriteSuccess({ data: favorites })))
  );

  removeFavorite$ = createEffect(() => this.actions$.pipe(
    ofType(removeFavorite),
    map((favorite: { data: FavoriteModel[] }) => {
      if (favorite?.data?.length) {
        this.favoritesService.removeFavorite(favorite.data[0]);
        this.successFavAlert('removed');
      }
      return this.favoritesService.favorites;
    }),
    map((favorites: FavoriteModel[]) => removeFavoriteSuccess({ data: favorites })))
  );

  constructor(
    private actions$: Actions,
    private favoritesService: FavoriteService,
    private appFacade: AppFacade,
    private translate: TranslateService
  ) {}

  successFavAlert(action: 'added' | 'removed' = 'added'): void {
    const title: string = this.translate.instant(`favorites.${ action }.title`);
    const text: string = this.translate.instant(`favorites.${ action }.text`);
    this.appFacade.successAlert(title, text);
  }

}



