import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IQueryParams } from '@api';
import { getItems, resetStateItems } from '../state/items.actions';
import { ItemsState } from '../state/items.reducer';
import { ItemModel } from '../models/item.model';
import { selectItems, selectTotal, selectLoading } from '../state/items.selector';
import { Observable } from 'rxjs';
import { AppFacade } from '../../../core/services/app.facade';

@Injectable({
  providedIn: 'root'
})
export class ItemsFacade {

  items$: Observable<ItemModel[]> = this.store.pipe(select(selectItems));
  total$: Observable<number> = this.store.pipe(select(selectTotal));
  loading$: Observable<boolean> = this.store.pipe(select(selectLoading));

  constructor(
    private store: Store<ItemsState>,
    private appFacade: AppFacade
  ) { }

  getAllItems(queryParams: IQueryParams): void {
    this.store.dispatch(getItems(queryParams));
  }

  resetStateItems(): void {
    this.store.dispatch(resetStateItems());
  }

  addToFavorite(item: ItemModel): void {
    this.appFacade.addFavorite(item);
  }

}
