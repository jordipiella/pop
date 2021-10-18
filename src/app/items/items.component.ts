import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemModel } from './models/item.model';
import { ItemsFacade } from './services/items.facade';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { IQueryParams, IApiResponse } from 'src/app/items/api';
import { IFilter } from '../core/interfaces/filter.interface';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {

  items: ItemModel[] = [];
  total: number = 0;
  loading: boolean = false;

  subscriptions: Subscription[] = [];

  constructor(
    private itemsFacade: ItemsFacade
  ) { }

  ngOnInit(): void {
    this.itemsSub();
    this.totalSub();
    this.loadingSub();
    this.filtersSub();
    this.favoritesSub();
    this.getAllItems(this.itemsFacade.params);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x: Subscription) => x.unsubscribe());
  }

  favoritesSub(): void {
    const favSubs: Subscription = this.itemsFacade.favorites$
      .pipe(
        tap(() => this.itemsFacade.setFavoriteProp(this.items))
      ).subscribe()
    this.subscriptions.push(favSubs);
  }

  loadingSub(): void {
    const loadingSubs: Subscription = this.itemsFacade.loading$
      .pipe(
        tap((isLoading: boolean) => this.setLoading(isLoading))
      ).subscribe();
    this.subscriptions.push(loadingSubs);
  }

  setLoading(isLoading: boolean): void {
    this.loading = (isLoading) ? true : false;
  }

  filtersSub(): void {
    const filtSubs: Subscription = this.itemsFacade.selectedFilters()
      .pipe(
        distinctUntilChanged((acc: IFilter, curr: IFilter) => (acc.search === curr.search) && (acc.sort === curr.sort)),
        tap((filters: IFilter) => this.setFilterValue(filters))
      ).subscribe();
    this.subscriptions.push(filtSubs);
  }

  setFilterValue(filterValues: any): void {
    this.setSearch(filterValues?.search);
    this.setSort(filterValues?.sort);
    this.resetList();
    this.getAllItems(this.itemsFacade.params);
  }

  setSearch(value: string): void {
    this.itemsFacade.setSearch(value);
  }

  setSort(value: string): void {
    this.itemsFacade.setSort(value);
  }

  removeSort(): void {
    this.itemsFacade.removeSort();
  }

  resetList(): void {
    this.itemsFacade.resetStateItems();
    this.items = [];
    this.itemsFacade.resetParams();
  }

  itemsSub(): void {
    const itemsSubs: Subscription = this.itemsFacade.items$
      .pipe(
        tap((items: ItemModel[]) => this.setItems(items)),
      ).subscribe();
    this.subscriptions.push(itemsSubs);
  }

  setItems(items: ItemModel[]): void {
    this.items = (items.length) ? [...items] : [];
  }

  totalSub(): void {
    const totalSub: Subscription = this.itemsFacade.total$
      .pipe(
        tap((total: number) => this.setTotal(total))
      ).subscribe();
    this.subscriptions.push(totalSub);
  }

  setTotal(total: number | null): void {
    this.total = (total) ? total : 0;
  }

  getAllItems(queryParams: IQueryParams): void {
    this.itemsFacade.getAllItems(queryParams);
  }

  loadMore(): void {
    if (this.items.length < this.total) {
      const params: IQueryParams = this.itemsFacade.params;
      params._page += 1;
      this.itemsFacade.params = params;
      this.getAllItems(this.itemsFacade.params);
    }
  }

  clickToFavorite(item: ItemModel): void {
    if (item.favorite) {
      this.itemsFacade.removeToFavorite(item);
    } else {
      this.itemsFacade.addToFavorite(item);
    }
    this.itemsFacade.setFavoriteProp(this.items);
  }

  isLoadMoreVisible(): boolean {
    return (this.total !== this.items?.length);
  }
}
