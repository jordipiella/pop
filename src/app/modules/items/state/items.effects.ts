import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { getItems, getItemsSuccess, getItemsFailure, setFavPropItems, setFavPropItemsSuccess } from './items.actions';
import { ItemsService } from '../services/items/items.service';
import { ItemModel } from '../models/item.model';
import { IQueryParams, IApiResponse } from '@api';


@Injectable()
export class ItemsEffects {
  loadItems$ = createEffect(() => this.actions$.pipe(
    ofType(getItems),
    exhaustMap((queryparams: IQueryParams) => this.itemsService.getAll(queryparams)
      .pipe(
        map((res: IApiResponse<ItemModel>) => {
          res.data = [...this.itemsService.setFavoriteProp(res.data) ];
          return res;
        }),
        map((res: IApiResponse<ItemModel>) => getItemsSuccess(res)),
        catchError((err: HttpErrorResponse) => of(getItemsFailure({ error: err })))
      ))
    )
  );

  setFavProp$ = createEffect(() => this.actions$.pipe(
    ofType(setFavPropItems),
    exhaustMap((res: { data: ItemModel[] }) => of(this.itemsService.setFavoriteProp(res.data))
      .pipe(
        map((res: ItemModel[]) => setFavPropItemsSuccess({ data: res }))
      )
    ))
  );

  constructor(
    private actions$: Actions,
    private itemsService: ItemsService
  ) {}
}



