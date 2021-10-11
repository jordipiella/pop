import { createFeatureSelector, createSelector } from '@ngrx/store';
import { itemsFeatureKey, ItemsState } from './items.reducer';

const selectItemsState = createFeatureSelector<ItemsState>(itemsFeatureKey);

export const selectItems = createSelector(
  selectItemsState,
  state => state.data
);

export const selectTotal = createSelector(
  selectItemsState,
  state => state.total
);

export const selectLoading = createSelector(
  selectItemsState,
    state => state.loading
);
