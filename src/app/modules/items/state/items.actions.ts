import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemModel } from '../models/item.model';
import { IQueryParams, IApiResponse } from '@api';

export const getItems = createAction(
    '[Items] - get Item List',
    props<IQueryParams>()
);

export const getItemsSuccess = createAction(
    '[Items] - get Item list success',
    props<IApiResponse<ItemModel>>()
);

export const getItemsFailure = createAction(
    '[Items] - get Item list failure',
    props<{ error: HttpErrorResponse }>()
);

export const resetStateItems = createAction(
    '[Items] - reset Item data'
);
