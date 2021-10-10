import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemModel } from './services/items/models/item.model';
import { ItemsFacade } from './services/items.facade';
import { IQueryParams } from '../api/interfaces/pagination.interface';
import { Observable, Subscription } from 'rxjs';
import { IApiResponse } from '../api/interfaces/response.interface';
import { tap } from 'rxjs/operators';


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
  queryParams: IQueryParams = { _limit: 5, _page: 0 };
  loading: Observable<boolean> = this.itemsFacade.loading$;

  constructor(
    private itemsFacade: ItemsFacade
  ) { }

  ngOnInit(): void {
    this.itemsSub();
    this.totalSub();
    this.getAllItems(this.queryParams);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x: Subscription) => x.unsubscribe());
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
