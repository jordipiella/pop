import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { IApiResponse } from '@api';
import { getItems, getItemsSuccess, getItemsFailure } from './items.actions';
import { ItemsService } from '../services/items/items.service';
import { ItemModel } from '../services/items/models/item.model';
import { IQueryParams } from '../../api/interfaces/pagination.interface';


@Injectable()
export class ItemsEffects {

  loadItems$ = createEffect(() => this.actions$.pipe(
    ofType(getItems),
    exhaustMap((queryparams: IQueryParams) => this.itemsService.getAll(queryparams)
      .pipe(
        map((res: IApiResponse<ItemModel>) => getItemsSuccess(res)),
        catchError((err: HttpErrorResponse) => of(getItemsFailure({ error: err })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private itemsService: ItemsService
  ) {}
}



