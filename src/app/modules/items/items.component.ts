import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemModel } from './services/items/models/item.model';
import { ItemsFacade } from './services/items.facade';
import { IQueryParams } from '../api/interfaces/pagination.interface';
import { Subscription } from 'rxjs';
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
  subscriptions: Subscription[] = [];

  constructor(
    private itemsFacade: ItemsFacade
  ) { }

  ngOnInit(): void {
    this.itemsSub();
    this.getAllItems({ _limit: 20, _page: 0 });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x: Subscription) => x.unsubscribe());
  }

  itemsSub(): void {
    const itemsSubs: Subscription = this.itemsFacade.items$
      .pipe(
        tap((items: ItemModel[]) => this.items = items)
      ).subscribe();
    this.subscriptions.push(itemsSubs);
  }

  getAllItems(queryParams: IQueryParams): void {
    this.itemsFacade.getAllItems(queryParams);
  }
}
