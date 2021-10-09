import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemModel } from './services/items/models/item.model';
import { ItemsFacade } from './services/items.facade';
import { debounceTime, take, tap } from 'rxjs/operators';
import { IQueryParams } from '../api/interfaces/pagination.interface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {

  items: ItemModel[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private itemsFacade: ItemsFacade
  ) { }

  ngOnInit(): void {
    this.itemsSub();
    this.getAllItems({ _limit: 5, _page: 0 });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x: Subscription) => x.unsubscribe());
  }

  itemsSub(): void {
    const itemsSubs: Subscription = this.itemsFacade.items$
      .pipe(
      ).subscribe();
    this.subscriptions.push(itemsSubs);
  }

  getAllItems(queryParams: IQueryParams): void {
    this.itemsFacade.getAllItems(queryParams);
  }
}
