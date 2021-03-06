import { createReducer, on } from '@ngrx/store';
import { ProductModel } from '../../models/product.model';
import * as favoritesAction from './favorites.actions';

export const favoritesFeatureKey: string = 'favorites';

export interface IFavoritesState {
    data: ProductModel[]
}

const initialState: IFavoritesState = {
    data: []
};

export const reducer = createReducer(
    initialState,
    on(favoritesAction.getFavorites, (state) => {
        return {
            ...state
        };
    }),
    on(favoritesAction.getFavoritesSuccess, (state, action) => {
        return {
            ...state,
            data: [...action.data],
        };
    }),
    on(favoritesAction.addFavorite, (state, action) => {
        return {
            ...state,
        };
    }),
    on(favoritesAction.addFavoriteSuccess, (state, action) => {
        return {
            ...state,
            data: [...action.data]
        };
    }),
    on(favoritesAction.removeFavorite, (state, action) => {
      return {
        ...state,
      };
    }),
    on(favoritesAction.removeFavoriteSuccess, (state, action) => {
      return {
        ...state,
        data: [...action.data]
      };
    })
);
