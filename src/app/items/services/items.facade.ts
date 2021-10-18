import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IQueryParams } from 'src/app/items/api';
import { getItems, resetStateItems, setFavPropItems } from '../state/items.actions';
import { ItemsState } from '../state/items.reducer';
import { ItemModel } from '../models/item.model';
import { selectItems, selectTotal, selectLoading } from '../state/items.selector';
import { Observable } from 'rxjs';
import { AppFacade } from '../../core/services/app.facade';
import { IFilter } from '../../core/interfaces/filter.interface';
import { ProductModel } from '../../core/models/product.model';
import { ItemsService } from './items/items.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsFacade {

  items$: Observable<ItemModel[]> = this.store.pipe(select(selectItems));
  total$: Observable<number> = this.store.pipe(select(selectTotal));
  loading$: Observable<boolean> = this.store.pipe(select(selectLoading));

  constructor(
    private store: Store<ItemsState>,
    private appFacade: AppFacade,
    private itemsService: ItemsService
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

  removeToFavorite(item: ItemModel): void {
    this.appFacade.removeFavorite(item);
  }

  setFavoriteProp(items: ItemModel[]): void {
    this.store.dispatch(setFavPropItems({ data: items }));
  }

  selectedFilters(): Observable<IFilter> {
    return this.appFacade.selectedFilters();
  }

  get favorites$(): Observable<ProductModel[]> {
    return this.appFacade.favorites$;
  }

  get params(): IQueryParams {
    return this.itemsService.params;
  }

  set params(value: IQueryParams) {
    this.itemsService.params = value;
  }

  setSort(value: string): void {
   this.itemsService.setSort(value);
  }

  removeSort(): void {
    this.itemsService.removeSort();
  }

  setSearch(value: string): void {
    this.itemsService.setSearch(value);
  }

  removeSearch(): void {
    this.itemsService.removeSearch();
  }

  resetParams(): void {
    this.itemsService.resetParams();
  }

}
