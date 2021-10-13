import { createAction, props } from '@ngrx/store';
import { FavoriteModel } from '../../services/favorites/models/favorite.model';

export const getFavorites = createAction(
  '[Favorites] - get Favorites List'
);

export const getFavoritesSuccess = createAction(
  '[Favorites] - get Favorite list success',
  props<{ data: FavoriteModel[] }>()
);

export const addFavorite = createAction(
  '[Favorites] - add Favorite',
  props<{ data: FavoriteModel[] }>()
);

export const addFavoriteSuccess = createAction(
  '[Favorites] - add Favorite success',
  props<{ data: FavoriteModel[] }>()
);

export const removeFavorite = createAction(
  '[Favorites] - remove Favorite',
  props<{ data: FavoriteModel[] }>()
);

export const removeFavoriteSuccess = createAction(
  '[Favorites] - remove Favorite success',
  props<{ data: FavoriteModel[] }>()
);


