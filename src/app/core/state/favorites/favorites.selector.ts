import { createFeatureSelector, createSelector } from '@ngrx/store';
import { favoritesFeatureKey, IFavoritesState } from './favorites.reducer';

const selectFavoritesState = createFeatureSelector<IFavoritesState>(favoritesFeatureKey);

export const selectFavorites = createSelector(
  selectFavoritesState,
  state => state.data
);
