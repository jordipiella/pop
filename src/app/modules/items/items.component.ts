import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemModel } from './services/items/models/item.model';
import { ItemsFacade } from './services/items.facade';
import { IQueryParams } from '../api/interfaces/pagination.interface';
import { Observable, Subscription } from 'rxjs';
import { IApiResponse } from '../api/interfaces/response.interface';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';
import { OrderEnum } from '../api/enums/order.enum';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {

  items: ItemModel[] = [];
  itemsPag: IApiResponse<ItemModel> = { total: 0, data: [] };
  total: number = 0;
  subscriptions: Subscription[] = [];
  queryParams: IQueryParams = { _limit: 5, _page: 1 };
  loading: Observable<boolean> = this.itemsFacade.loading$;
  options = [
    { label: 'Title', value: 'title' },
    { label: 'Description', value: 'description' },
    { label: 'Price', value: 'price' },
    { label: 'Email', value: 'email' }
  ];
  sortForm: FormControl = this.fb.control('');
  searchForm: FormControl = this.fb.control('');

  constructor(
    private itemsFacade: ItemsFacade,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.itemsSub();
    this.totalSub();
    this.sortSub();
    this.searchSub();
    this.getAllItems(this.queryParams);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x: Subscription) => x.unsubscribe());
  }

  searchSub(): void {
    const searchSub: Subscription = this.searchForm.valueChanges
      .pipe(
        filter((value: string) => value.length > 2 || !value),
        debounceTime(500),
        distinctUntilChanged(),
        tap((value: string) => this.setSearch(value)),
        tap(() => this.resetList()),
        tap(() => this.getAllItems(this.queryParams))
      ).subscribe();
    this.subscriptions.push(searchSub);
  }

  setSearch(value: string): void {
    if (!value) {
      delete this.queryParams.q;
      return;
    }
    this.queryParams.q = value;
  }

  sortSub(): void {
    const sortSub: Subscription = this.sortForm.valueChanges
      .pipe(
        tap((value: string) => this.setSort(value)),
        tap(() => this.resetList()),
        tap(() => this.getAllItems(this.queryParams))
      ).subscribe();
    this.subscriptions.push(sortSub);
  }

  setSort(value: string): void {
    if (!value || value === null) {
      this.removeSort();
      return;
    }
    this.queryParams._sort = value;
    this.queryParams._order = OrderEnum.asc;
  }

  removeSort(): void {
    delete this.queryParams._order;
    delete this.queryParams._sort;
  }

  resetList(): void {
    this.itemsFacade.resetStateItems();
    this.items = [];
  }

  itemsSub(): void {
    const itemsSubs: Subscription = this.itemsFacade.items$
      .pipe(
        tap((items: ItemModel[]) => this.setItems(items))
      ).subscribe();
    this.subscriptions.push(itemsSubs);
  }

  setItems(items: ItemModel[] | null): void {
    this.items = items?.length ? [...this.items, ...items] : this.items;
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
      this.queryParams._page += 1;
      this.getAllItems(this.queryParams);
    }
  }
}
