import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IQueryParams } from '../../api/interfaces/pagination.interface';
import { getItems, resetStateItems } from '../state/items.actions';
import { ItemsState } from '../state/items.reducer';

@Injectable({
  providedIn: 'root'
})
export class ItemsFacade {

  constructor(
    private store: Store<ItemsState>
  ) { }

  getAllItems(queryParams: IQueryParams): void {
    this.store.dispatch(getItems(queryParams));
  }

  resetStateItems(): void {
    this.store.dispatch(resetStateItems());
  }

}
