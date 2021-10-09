import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IQueryParams } from '../../api/interfaces/pagination.interface';
import { getItems, resetStateItems } from '../state/items.actions';
import { ItemsState } from '../state/items.reducer';
import { ItemModel } from './items/models/item.model';
import { selectItems } from '../state/items.selector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsFacade {

  items$: Observable<ItemModel[]> = this.store.pipe(select(selectItems));

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
