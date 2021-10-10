import { createReducer, on } from '@ngrx/store';
import * as itemAction from './items.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemModel } from '../services/items/models/item.model';

export const itemsFeatureKey: string = 'items';

export interface ItemsState {
    data: ItemModel[];
    total: number,
    loading: boolean;
    error: HttpErrorResponse | null;
}

const initialState: ItemsState = {
    data: [],
    total: 0,
    loading: false,
    error: null
};

export const reducer = createReducer(
    initialState,
    on(itemAction.getItems, (state) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(itemAction.getItemsSuccess, (state, action) => {
        return {
            ...state,
            data: [...action.data],
            total: action.total ? action.total : 0,
            loading: false
        };
    }),
    on(itemAction.getItemsFailure, (state, action) => {
        return {
            ...state,
            error: action.error,
            loading: false
        };
    }),
    on(itemAction.resetStateItems, (state, action) => {
        return initialState;
    })
);
