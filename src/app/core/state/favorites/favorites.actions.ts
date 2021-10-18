import { createAction, props } from '@ngrx/store';
import { ProductModel } from '../../models/product.model';

export const getFavorites = createAction(
  '[Favorites] - get Favorites List'
);

export const getFavoritesSuccess = createAction(
  '[Favorites] - get Favorite list success',
  props<{ data: ProductModel[] }>()
);

export const addFavorite = createAction(
  '[Favorites] - add Favorite',
  props<{ data: ProductModel[] }>()
);

export const addFavoriteSuccess = createAction(
  '[Favorites] - add Favorite success',
  props<{ data: ProductModel[] }>()
);

export const removeFavorite = createAction(
  '[Favorites] - remove Favorite',
  props<{ data: ProductModel[] }>()
);

export const removeFavoriteSuccess = createAction(
  '[Favorites] - remove Favorite success',
  props<{ data: ProductModel[] }>()
);


