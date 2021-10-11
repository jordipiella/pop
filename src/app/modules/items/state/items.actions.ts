import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemModel } from '../services/items/models/item.model';
import { IQueryParams } from '../../api/interfaces/pagination.interface';
import { IApiResponse } from '../../api/interfaces/response.interface';

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
